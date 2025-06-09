import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: any): Promise<UserDocument> {

    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }


    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async updateUserInfo(userId: string, updates: Partial<{ email: string; password: string }>) {

    if (updates.email) {
      const existingUser = await this.findByEmail(updates.email);
      if (existingUser && (existingUser._id as Types.ObjectId).toString() !== userId) {
        throw new BadRequestException('Email already exists');
      }
    }

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    return this.userModel.findByIdAndUpdate(userId, updates, { new: true });
  }
}
