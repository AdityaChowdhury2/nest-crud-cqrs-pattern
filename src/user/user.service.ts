import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser({ name, email, age }: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return null;
    }
    return await this.userModel.create({ name, email, age });
  }

  async getAllUser({ page, limit }: { page?: number; limit?: number }) {
    return await this.userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      return null;
    }
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async deleteUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      return null;
    }
    return await this.userModel.findByIdAndDelete(id);
  }
}
