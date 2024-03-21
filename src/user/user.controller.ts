import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { CreateUserDto } from './dtos/create-user.dto';

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UpdateUserCommand } from './commands/update-user.command';

@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const { name, email, age } = user;
    return await this.commandBus.execute(
      new CreateUserCommand({ name, email, age }),
    );
  }

  @Put(':id')
  async updateUser(@Body() user: CreateUserDto, @Param('id') id: string) {
    const { name, email, age } = user;
    return await this.commandBus.execute(
      new UpdateUserCommand({ name, email, age }, id),
    );
  }
}
