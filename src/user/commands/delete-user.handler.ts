import { DeleteUserCommand } from './delete-user.command';
import { CommandHandler } from '@nestjs/cqrs';
import { UserService } from '../entity/user.service';
import { User } from '../schemas/user.schema';
import { lastValueFrom } from 'rxjs';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler {
  constructor(private readonly userService: UserService) {}

  execute(command: DeleteUserCommand): Promise<User> {
    return lastValueFrom(this.userService.deleteUserById(command.id));
  }
}
