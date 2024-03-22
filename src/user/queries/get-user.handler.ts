import { QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { UserService } from '../user.service';
import { User } from '../schemas/user.schema';
import { lastValueFrom } from 'rxjs';

@QueryHandler(GetUsersQuery)
export class GetAllUserHandler {
  constructor(private readonly userService: UserService) {}
  execute(query: GetUsersQuery): Promise<User[]> {
    const { page, limit } = query;

    return lastValueFrom(this.userService.getAllUser({ page, limit }));
  }
}
