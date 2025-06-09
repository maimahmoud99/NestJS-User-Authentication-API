import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto, currentUser: any): Promise<Todo> {
    const createdTodo = new this.todoModel({
      ...createTodoDto,
      createdBy: currentUser.id, // تأكد إن الـ schema فيه createdBy
    });
    return createdTodo.save();
  }

  async findAll(filter?: { assigned?: string; isCompleted?: string }): Promise<Todo[]> {
    const query = this.todoModel.find();

    if (filter) {
      if (filter.assigned) query.where('assignedTo').equals(filter.assigned);
      if (filter.isCompleted) query.where('isCompleted').equals(filter.isCompleted === 'true');
    }

    return query.populate('assignedTo', 'fullName email').exec();
  }

  async findById(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).populate('assignedTo', 'fullName email').exec();
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, currentUser: any): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException('Todo not found');

    if (todo.createdBy.toString() !== currentUser.id && currentUser.role !== 'admin') {
      throw new ForbiddenException('You are not allowed to edit this todo.');
    }

    Object.assign(todo, updateTodoDto);
    return todo.save();
  }

  async markAsCompleted(id: string, currentUser: any): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException('Todo not found');

    if (todo.createdBy.toString() !== currentUser.id && currentUser.role !== 'admin') {
      throw new ForbiddenException('You are not allowed to complete this todo.');
    }

    todo.isCompleted = true;
    return todo.save();
  }

  async delete(id: string, currentUser: any): Promise<void> {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException('Todo not found');

    if (todo.createdBy.toString() !== currentUser.id && currentUser.role !== 'admin') {
      throw new ForbiddenException('You are not allowed to delete this todo.');
    }

    await this.todoModel.findByIdAndDelete(id).exec();
  }
}
