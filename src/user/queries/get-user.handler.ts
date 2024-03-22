import { QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { UserService } from '../user.service';

@QueryHandler(GetUsersQuery)
export class GetAllUserHandler {
  constructor(private readonly userService: UserService) {}
  async execute(query: GetUsersQuery) {
    const { page, limit } = query;

    return this.userService.getAllUser({ page, limit });
  }
}
