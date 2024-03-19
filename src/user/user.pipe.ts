import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable()
export class UserPipe implements PipeTransform<string, User> {
  constructor(private readonly userService: UserService) {}

  transform(id: User['id']) {
    const user = this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`No user with id ${id}`);
    }

    return user;
  }
}
