import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@modules/public/user/entities/user.entity';
import { Repository } from 'typeorm';
import { PostLoginDto } from './dto/post-login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET;

  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.JWT_SECRET = this.configService.get<string>('AUTH_TOKEN_SECRET');
  }

  async postLogin(body: PostLoginDto) {
    const [user] = await this.userRepository.find({
      where: {
        username: body.username,
      },
      select: ['id', 'tenant', 'name', 'email', 'password'],
      loadRelationIds: true,
    });

    if (!user) {
      throw new BadRequestException('Usuário e/ou senha inválidos');
    }

    const logged = await bcrypt.compare(body.password, user.password);

    if (!logged) {
      throw new BadRequestException('Usuário e/ou senha inválidos');
    }

    const expiresIn = '3h';

    const accessToken = jwt.sign(
      {
        userId: user.id,
        tenantId: user.tenant,
        email: user.email,
        name: user.name,
      },
      this.JWT_SECRET,
      {
        expiresIn,
      },
    );

    return {
      accessToken,
      expiresIn,
    };
  }

  verifyToken(accessToken: string) {
    return jwt.verify(accessToken, this.JWT_SECRET) as {
      userId: string;
      tenantId: string;
      email: string;
      name: string;
    };
  }
}
