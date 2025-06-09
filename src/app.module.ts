import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config/configuration';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TodoAssignmentModule } from './todo-assignment/todo-assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TodosModule,
    TodoAssignmentModule,
  ],
})
export class AppModule {}
