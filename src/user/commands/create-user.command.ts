import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly userPayload: CreateUserDto) {}
}
