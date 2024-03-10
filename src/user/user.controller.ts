import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserPipe } from './user.pipe';
import { User } from '../interfaces/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe, UserPipe) user: User) {
    return user;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updatePassword(
    @Param('id', ParseUUIDPipe, UserPipe) user: User,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const updatedUser = this.userService.updatePassword(
      user,
      updateUserPasswordDto,
    );

    if (!updatedUser) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }

    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe, UserPipe) user: User) {
    this.userService.remove(user.id);
  }
}
