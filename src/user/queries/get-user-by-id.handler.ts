import { QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async execute(query: GetUserByIdQuery) {
    const { id } = query;
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
