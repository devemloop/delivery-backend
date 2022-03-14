import { AuthService } from '@modules/public/auth/auth.service';
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserDataMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  use(req: Request, res: Response, next: () => void) {
    if (!req.headers['authorization']) {
      return next();
    }

    const accessToken = req.headers['authorization'];

    if (!accessToken) {
      throw new ForbiddenException('Token não informado');
    }

    const [type, token] = accessToken.split(' ');
    if (type.toLowerCase() != 'bearer' || !token) {
      throw new ForbiddenException('O token informado é inválido');
    }

    try {
      const tokenData = this.authService.verifyToken(token);
      req.authData = tokenData;
    } catch (_) {
      throw new ForbiddenException('O token informado é inválido');
    }

    next();
  }
}
