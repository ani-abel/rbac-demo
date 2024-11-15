import {
  CanActivate,
  Logger,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { RoleService } from '../role/role.service';
import { Users } from '../../entities/user.entity';
import { Actions, Features } from '../../utils/util.constant';
import { CHECK_ABILITY, RequiredRules } from './ability.decorator';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RbacGuard implements CanActivate {
  private logger = new Logger(RbacGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly roleSrv: RoleService,
    private readonly permissionSrv: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req: Request = context.switchToHttp().getRequest();
      const res: Response = context.switchToHttp().getResponse();
      const user = req['userData'] as Users;
      if (!user?.roleId) {
        throw new ForbiddenException(
          'Forbidden...You do not have any assigned roles',
        );
      }
      const role = await this.roleSrv.getRepo().findOne({
        where: { id: user.roleId },
        relations: ['rolePermissions', 'rolePermissions.permissionType'],
      });
      const rules =
        this.reflector.get<RequiredRules[]>(
          CHECK_ABILITY,
          context.getHandler(),
        ) ?? [];
      const permissionsUserHas = role.rolePermissions.map(
        ({ permissionType }) => permissionType,
      );
      // const permissionsUserHas = await this.permissionSrv.findAllByCondition({
      //   action: Actions.MANAGE,
      //   feature: Features.ALL,
      // });
      const masterPermission = permissionsUserHas.find(
        (permission) =>
          permission.action === Actions.MANAGE &&
          permission.feature === Features.ALL,
      );
      if (masterPermission?.id) {
        return true;
      }

      // Handle specialized permissions
      const { feature, featureGroup, action } = rules[0];
      const permission = permissionsUserHas.find(
        (permission) =>
          (permission.action === action && permission.feature === feature) ||
          (permission.action === Actions.MANAGE &&
            permission.feature === feature),
      );
      if (permission?.id) {
        return true;
      }
      const message = `Forbidden...you do not have the right permissions. You must have the '${featureGroup} -> ${feature} -> ${action}' permission`;
      throw new ForbiddenException(message);
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }
}
