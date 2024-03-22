import { QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@QueryHandler(GetUsersQuery)
export class GetUserHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async execute(query: GetUsersQuery) {
    const { page, limit } = query;
    console.log(page, limit);
    return await this.userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
}
