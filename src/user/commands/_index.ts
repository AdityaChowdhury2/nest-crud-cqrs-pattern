import { CreateUserHandler } from './create-user.handler';
import { UpdateUserHandler } from './update-user.handler';

export const AllCommandHandler = [CreateUserHandler, UpdateUserHandler];
