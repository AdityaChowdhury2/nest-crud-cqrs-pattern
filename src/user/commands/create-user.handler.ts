import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { ConflictException } from '@nestjs/common';
import { UserService } from '../user.service';
import { User } from '../schemas/user.schema';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler {
  constructor(private userService: UserService) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const user = await this.userService.createUser(command.createUserDto);
    if (!user) {
      throw new ConflictException('User already exists');
    }
    return user;
  }
}
