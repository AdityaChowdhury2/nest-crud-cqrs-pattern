import { CreateUserHandler } from './create-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import { UpdateUserHandler } from './update-user.handler';

export const AllCommandHandler = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
