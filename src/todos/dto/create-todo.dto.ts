import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsMongoId()
  assignedTo: string;
}
