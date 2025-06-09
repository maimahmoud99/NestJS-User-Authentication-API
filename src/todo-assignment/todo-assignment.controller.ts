import { Controller, Get } from '@nestjs/common';
import { TodoAssignmentService } from './todo-assignment.service';

@Controller('todo-assignment')
export class TodoAssignmentController {
  constructor(private readonly todoAssignmentService: TodoAssignmentService) {}

  @Get()
  getHello(): string {
    return this.todoAssignmentService.getHello();
  }
}
