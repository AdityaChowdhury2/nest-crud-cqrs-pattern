import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
// import { UserService } from '../user.service';
import { UserAggregateService } from '../aggregates/user-aggregate/user-aggregate.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler {
  constructor(
    private publisher: EventPublisher,
    private manager: UserAggregateService,
  ) {}

  async execute(command: CreateUserCommand) {
    const { userPayload } = command;
    const aggregate = this.publisher.mergeObjectContext(this.manager);
    await aggregate.createUser(userPayload);
    aggregate.commit();
  }
}
