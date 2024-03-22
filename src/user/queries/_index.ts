import { GetUserByIdHandler } from './get-user-by-id.handler';
import { GetUserHandler } from './get-user.handler';

export const ALLQueriesHandler = [GetUserHandler, GetUserByIdHandler];
