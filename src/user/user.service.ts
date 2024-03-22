import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { from, map, Observable, switchMap } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto): Observable<User> {
    /*
  Here's how switchMap works:
    * When a new value is emitted by the source observable, switchMap cancels the previous inner observable (if it exists) and starts a new inner observable based on the emitted value.
    * The new inner observable is subscribed to, and its emissions are passed through to the resulting observable.
    * If a new value is emitted by the source observable while the previous inner observable is still active, the previous inner observable is cancelled and replaced with the new one.*/
    return from(this.userModel.findOne({ email: createUserDto.email })).pipe(
      switchMap((user) => {
        if (user) {
          throw new ConflictException('User already exists');
        }
        return from(new this.userModel(createUserDto).save());
      }),
    );
  }

  getAllUser({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }): Observable<User[]> {
    return from(
      this.userModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
    ).pipe(
      map((users) => {
        if (!users) {
          throw new NotFoundException('Users not found');
        }
        return users;
      }),
    );
  }

  getUserById(id: string): Observable<User> {
    return from(this.userModel.findById(id)).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }),
    );
  }

  updateUserById(id: string, updateUserDto: UpdateUserDto): Observable<User> {
    return from(this.userModel.findById(id)).pipe(
      switchMap((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return from(
          this.userModel.findOne({ email: updateUserDto.email }),
        ).pipe(
          switchMap((existingUser) => {
            if (!existingUser) {
              return from(
                this.userModel.findByIdAndUpdate(id, updateUserDto, {
                  new: true,
                }),
              );
            } else {
              throw new ConflictException('User already exists');
            }
          }),
        );
      }),
    );
  }

  deleteUserById(id: string): Observable<User> {
    return from(this.userModel.findByIdAndDelete(id)).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }),
    );
  }
}
