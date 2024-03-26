// import { UserAddedEvent } from '../../event/add-user-event/add-user-event';
import { CreateUserDto } from '../../entity/create-user.dto';
import { AggregateRoot } from '@nestjs/cqrs';
import { User } from 'src/user/schemas/user.schema';
import { of } from 'rxjs';

export class UserAggregateService extends AggregateRoot {
  // Define your aggregate properties and methods here

  constructor() {
    super();
    // Initialize your aggregate state here
  }

  // Define your aggregate methods here
  addUser(userPayload: CreateUserDto) {
    const user = new User();
    Object.assign(user, userPayload);
    console.log(user);
    // this.apply(new UserAddedEvent(user));
    return of(user);
  }
}
