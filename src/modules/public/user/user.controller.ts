import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUserByIdParams, UserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param() params: GetUserByIdParams) {
    return this.userService.getUserById(params.id);
  }

  @Post()
  async postUser(@Body() body: UserDto) {
    return this.userService.postUser(body);
  }
}
