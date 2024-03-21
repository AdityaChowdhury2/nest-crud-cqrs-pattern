import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(command: CreateUserCommand) {
    const user = await this.userModel.findOne({
      email: command.createUserDto.email,
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    return await this.userModel.create(command.createUserDto);
  }
}
