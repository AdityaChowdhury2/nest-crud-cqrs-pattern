import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserAggregateService } from '../aggregates/user-aggregate/user-aggregate.service';
import { UserService } from '../entity/user.service';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler {
  constructor(
    private publisher: EventPublisher,
    private manager: UserAggregateService,
    private userService: UserService,
  ) {}

  async execute(command: CreateUserCommand) {
    const { user } = command;
    const existingUser = await this.userService.findUserByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    } else {
      const aggregate = this.publisher.mergeObjectContext(this.manager);
      const created = await aggregate.addUser(user);
      aggregate.commit();
      return created;
    }
  }
}
