import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AllCommandHandler } from './commands/_index';
import { ALLQueriesHandler } from './queries/_index';
// import { UserService } from './entity/user.service';
import { UserAggregateManager } from './aggregates/_index';
import { UserEntityModule } from './entity/entity.module';
import { UserEventManager } from './event/_index';

@Module({
  imports: [CqrsModule, UserEntityModule],
  controllers: [UserController],
  providers: [
    ...AllCommandHandler,
    ...ALLQueriesHandler,
    ...UserAggregateManager,
    ...UserEventManager,
  ],
  exports: [UserEntityModule],
})
export class UserModule {}
