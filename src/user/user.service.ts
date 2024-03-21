import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands/create-user.command';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(command: CreateUserCommand): Promise<User> {
    return await this.userModel.create(command);
  }
}
