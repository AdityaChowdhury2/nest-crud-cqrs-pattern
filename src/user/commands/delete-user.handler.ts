import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { DeleteUserCommand } from './delete-user.command';
import { CommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(command: DeleteUserCommand) {
    const user = await this.userModel.findById(command.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userModel.findByIdAndDelete(command.id);
  }
}
