import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserService } from 'src/user/entity/user.service';
import { UserAddedEvent } from './add-user-event';

@EventsHandler(UserAddedEvent)
export class AddUserEventHandler implements IEventHandler<UserAddedEvent> {
  constructor(private readonly userService: UserService) {}
  async handle(event: UserAddedEvent) {
    // Handle the event here
    // You can access the event data using event.propertyName

    console.log('User created: ', event);
    // Perform any necessary actions based on the event
    // Return a result if needed
    // return this.userService.createUser(event.createUserDto);
  }
}
