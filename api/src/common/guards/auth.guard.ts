import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../constants/user-roles.const';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    const roles = this.reflector.get<UserRoles[]>('roles', context.getHandler()) || [];
    if (!user || roles.length && !roles.some(role => role === user.role)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}