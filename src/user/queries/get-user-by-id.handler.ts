import { QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '../user.service';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler {
  constructor(private readonly userService: UserService) {}
  async execute(query: GetUserByIdQuery) {
    const { id } = query;
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
