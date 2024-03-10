import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from '../interfaces/user';
import { v4 as uuid } from 'uuid';
import db from '../db/db';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const id = uuid();
    const user: User = {
      id,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      ...createUserDto,
    };

    db.user.set(id, user);

    return this.getOne(id);
  }

  findAll() {
    return [...db.user.values()];
  }

  // TODO: добавить @Exclude на пароль когда подключим typeorm
  getOne(id: string) {
    const user = db.user.get(id);

    if (!user) {
      return;
    }

    const { password, ...userRest } = user;

    return userRest;
  }

  findOne(id: string) {
    return db.user.get(id);
  }

  updatePassword(user: User, updateUserPasswordDto: UpdateUserPasswordDto) {
    if (user.password !== updateUserPasswordDto.oldPassword) {
      return;
    }

    db.user.set(user.id, {
      ...user,
      password: updateUserPasswordDto.newPassword,
      updatedAt: new Date().getTime(),
      version: user.version + 1,
    });

    return this.getOne(user.id);
  }

  remove(id: string) {
    return db.user.delete(id);
  }
}
