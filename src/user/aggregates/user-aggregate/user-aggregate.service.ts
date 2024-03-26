// Import other modules and classes
import { UserCreatedEvent } from 'src/user/event/create-user.event';
import { CreateUserDto } from '../../entity/create-user.dto';
import { AggregateRoot } from '@nestjs/cqrs';
import { User } from 'src/user/schemas/user.schema'; // Ensure correct import path
import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

@Injectable()
export class UserAggregateService extends AggregateRoot {
  constructor() {
    super();
  }

  // Define a method to create a new user
  async createUser(userPayload: CreateUserDto) {
    const user = new User();
    Object.assign(user, userPayload);
    user.uuid = uuid();
    console.log(user);
    this.apply(new UserCreatedEvent(user));
  }
}
