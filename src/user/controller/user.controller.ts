import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { CreateUserDto } from '../entity/create-user.dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateUserCommand } from '../commands/update-user.command';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { GetUsersQuery } from '../queries/get-users.query';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';
import { UpdateUserDto } from '../entity/update-user.dto';
import { User } from '../schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.commandBus.execute(new CreateUserCommand(user));
  }

  @Put(':id')
  async updateUser(@Body() user: UpdateUserDto, @Param('id') id: string) {
    return await this.commandBus.execute(new UpdateUserCommand(user, id));
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.commandBus.execute(new DeleteUserCommand(id));
  }

  @Get()
  async getAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.queryBus.execute(new GetUsersQuery(page, limit));
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.queryBus.execute(new GetUserByIdQuery(id));
  }
}
