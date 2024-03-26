import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AllCommandHandler } from './commands/_index';
import { ALLQueriesHandler } from './queries/_index';

import { UserAggregateManager } from './aggregates/_index';
import { UserEntitiesModule } from './entity/entity.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEventManager } from './event/_index';

@Module({
  imports: [CqrsModule, UserEntitiesModule],
  controllers: [UserController],
  providers: [
    ...UserAggregateManager,
    ...UserEventManager,
    ...AllCommandHandler,
    ...ALLQueriesHandler,
  ],
  exports: [UserEntitiesModule],
})
export class UserModule {}
