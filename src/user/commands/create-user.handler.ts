import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserService } from '../user.service';
import { User } from '../schemas/user.schema';
import { lastValueFrom } from 'rxjs';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler {
  constructor(private userService: UserService) {}

  execute(command: CreateUserCommand): Promise<User> {
    return lastValueFrom(this.userService.createUser(command.createUserDto));
  }
}
