import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PostLoginDto } from './dto/post-login.dto';
import { PublicRoute } from '@shared/decorator/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post('login')
  async postLogin(@Body() body: PostLoginDto) {
    return this.authService.postLogin(body);
  }
}
