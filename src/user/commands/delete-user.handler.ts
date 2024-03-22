import { DeleteUserCommand } from './delete-user.command';
import { CommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '../user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler {
  constructor(private readonly userService: UserService) {}

  async execute(command: DeleteUserCommand) {
    const user = await this.userService.deleteUserById(command.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
