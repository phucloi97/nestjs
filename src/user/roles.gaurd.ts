import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGaurd implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext) {
    const roles: number[] = this.reflector.get<number[]>(
      'roles',
      ctx.getHandler(),
    );
    console.log(roles);
    if (!roles) {
      return true;
    }
    const role = ctx.switchToHttp().getRequest().user?.role;
    console.log('jkhghjug');
    return this.matchRoles(roles, role);
  }
  matchRoles(roles: number[], role: number) {
    return roles.indexOf(role) === -1 ? false : true;
  }
}
