import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async execute(command: UpdateUserCommand) {
    const user = await this.userModel.findById(command.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userModel.findByIdAndUpdate(
      command.id,
      command.updateUserDto,
      { new: true, upsert: true },
    );
  }
}
