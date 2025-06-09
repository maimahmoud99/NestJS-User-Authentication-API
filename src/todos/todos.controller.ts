import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    return this.todosService.create(createTodoDto, req.user);
  }

  @Get()
  findAll(@Query('assigned') assigned: string, @Query('completed') completed: string) {
    // غيرت هنا من completed إلى isCompleted
    return this.todosService.findAll({ assigned, isCompleted: completed });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Req() req) {
    return this.todosService.update(id, updateTodoDto, req.user);
  }

  @Patch(':id/complete')
  markAsCompleted(@Param('id') id: string, @Req() req) {
    return this.todosService.markAsCompleted(id, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.todosService.delete(id, req.user);
  }
}
