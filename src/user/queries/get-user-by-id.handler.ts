import { QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { UserService } from '../user.service';

import { lastValueFrom } from 'rxjs';
import { User } from '../schemas/user.schema';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler {
  constructor(private readonly userService: UserService) {}

  /**
   * Get a single User by ID.
   * @param query GetUserByIdQuery with user ID
   * @returns the User with the given ID
   * @throws NotFoundException if no User is found
   */
  execute(query: GetUserByIdQuery): Promise<User> {
    const { id } = query;
    const user = lastValueFrom(this.userService.getUserById(id));
    return user;
  }
}
