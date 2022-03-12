import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = this.reflector.get<boolean>(
      'isPublicRoute',
      context.getHandler(),
    );

    if (isPublicRoute) {
      return true;
    }

    const accessToken = context.getArgs()[0].headers.authorization;

    if (!accessToken) {
      throw new ForbiddenException('Token não informado');
    }

    const [type, token] = accessToken.split(' ');
    if (
      type.toLowerCase() != 'bearer' ||
      !token ||
      !this.authService.verifyToken(token)
    ) {
      throw new ForbiddenException('O token informado é inválido');
    }

    return true;
  }
}
