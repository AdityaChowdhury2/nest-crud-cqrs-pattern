import { UserService } from './../user.service';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { lastValueFrom } from 'rxjs';
import { User } from '../schemas/user.schema';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler {
  constructor(private readonly userService: UserService) {}
  execute(command: UpdateUserCommand): Promise<User> {
    return lastValueFrom(
      this.userService.updateUserById(command.id, command.updateUserDto),
    );
  }
}
