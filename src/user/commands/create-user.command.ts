import { CreateUserDto } from '../entity/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly user: CreateUserDto) {}
}
