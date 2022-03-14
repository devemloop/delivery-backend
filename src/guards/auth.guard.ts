import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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

    return !!context.switchToHttp().getRequest().authData?.userId;
  }
}
