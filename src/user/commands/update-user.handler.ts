import { UserService } from './../user.service';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler {
  constructor(private readonly userService: UserService) {}
  async execute(command: UpdateUserCommand) {
    const user = await this.userService.updateUserById(
      command.id,
      command.updateUserDto,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
