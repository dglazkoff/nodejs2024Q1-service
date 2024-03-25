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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserPipe } from './user.pipe';
import { User } from './entity/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe, UserPipe) user: User) {
    return user;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updatePassword(
    @Param('id', ParseUUIDPipe, UserPipe) user: User,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const updatedUser = await this.userService.updatePassword(
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
  async remove(@Param('id', ParseUUIDPipe, UserPipe) user: User) {
    return this.userService.remove(user.id);
  }
}
