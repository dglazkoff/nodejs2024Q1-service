import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async updatePassword(
    user: User,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    if (user.password !== updateUserPasswordDto.oldPassword) {
      return;
    }

    this.usersRepository.merge(user, {
      password: updateUserPasswordDto.newPassword,
    });

    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
