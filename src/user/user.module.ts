import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { AllCommandHandler } from './commands/_index';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [...AllCommandHandler],
})
export class UserModule {}
