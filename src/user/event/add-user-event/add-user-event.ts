import { IEvent } from '@nestjs/cqrs';
import { CreateUserDto } from 'src/user/entity/create-user.dto';

export class UserAddedEvent implements IEvent {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
