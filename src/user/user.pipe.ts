import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Injectable()
export class UserPipe implements PipeTransform<string, Promise<User>> {
  constructor(private readonly userService: UserService) {}

  async transform(id: User['id']) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`No user with id ${id}`);
    }

    return user;
  }
}
