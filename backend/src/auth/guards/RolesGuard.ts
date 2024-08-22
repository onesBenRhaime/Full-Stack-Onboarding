/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // canActivate(context: ExecutionContext): boolean {
  //   const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   if (!requiredRoles) {
  //     return true;
  //   }

  //   const { user }: { user: User } = context.switchToHttp().getRequest();
  //   console.log('User object:', user);
  //   console.log('User roles:', user?.roles); // Ajouter ce log
  //   if (!user?.roles) return false; // Gestion du cas où user.roles est undefined

  //   return requiredRoles.some((role) =>
  //     user.roles?.map((r) => r.name).includes(role),
  //   );
  // }
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user }: { user: User } = request;

    console.log('User object:', user); // Log l'objet utilisateur complet
    console.log('Required roles:', requiredRoles); // Log les rôles requis par le décorateur @Roles
    console.log('User roles:', user?.roles); // Log les rôles de l'utilisateur

    if (!user?.roles) return false;

    const hasRole = requiredRoles.some((role) =>
      user.roles?.map((r) => r.name).includes(role),
    );

    console.log('Has required role:', hasRole); // Log le résultat de la vérification des rôles

    return hasRole;
  }
}
