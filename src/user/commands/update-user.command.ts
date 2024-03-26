import { UpdateUserDto } from '../entity/update-user.dto';

export class UpdateUserCommand {
  constructor(
    public readonly updateUserDto: UpdateUserDto,
    public readonly id: string,
  ) {}
}
