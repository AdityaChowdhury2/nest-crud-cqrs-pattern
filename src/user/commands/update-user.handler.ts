import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async execute(command: UpdateUserCommand) {
    // console.log(command);
    return await this.userModel.findByIdAndUpdate(
      command.id,
      command.updateUserDto,
    );
  }
}
