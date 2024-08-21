/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();
    console.log('User object:', user);
    console.log('User roles:', user?.roles); // Ajouter ce log
    if (!user?.roles) return false; // Gestion du cas où user.roles est undefined

    return requiredRoles.some((role) =>
      user.roles?.map((r) => r.name).includes(role),
    );
  }
}
