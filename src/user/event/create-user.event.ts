import { IEvent } from '@nestjs/cqrs';
import { User } from '../schemas/user.schema';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly userPayload: User) {}
}
