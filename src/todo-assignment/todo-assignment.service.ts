import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoAssignmentService {
  getHello(): string {
    return 'Hello from TodoAssignmentService';
  }
}
