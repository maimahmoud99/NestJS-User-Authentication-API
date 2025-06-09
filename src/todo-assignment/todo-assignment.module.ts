import { Module } from '@nestjs/common';
import { TodoAssignmentService } from './todo-assignment.service';
import { TodoAssignmentController } from './todo-assignment.controller';

@Module({
  controllers: [TodoAssignmentController],
  providers: [TodoAssignmentService],
  exports: [TodoAssignmentService], 
})
export class TodoAssignmentModule {}
