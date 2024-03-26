import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from './create-user.event';
import { UserService } from '../entity/user.service';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(private readonly userService: UserService) {}

  async handle(event: UserCreatedEvent) {
    // console.log(event);
    const { userPayload } = event;
    console.log(userPayload);
    await this.userService.createUser(userPayload);
  }
}
