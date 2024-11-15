import { Injectable, OnModuleInit } from '@nestjs/common';
import { Roles } from '../../entities/role.entity';
import { GenericService } from '../../services/generic.service';
import { RolePermissionService } from '../role-permission/role-permission.service';
import { RolePermissions } from '../../entities/role-permissions.entity';

@Injectable()
export class RoleService extends GenericService(Roles) implements OnModuleInit {
  constructor(private rolePermissionSrv: RolePermissionService) {
    super();
  }

  onModuleInit() {
    const roleList: Partial<Roles>[] = [
      {
        id: '64f56f06-c970-40f2-8a68-5907cda06f05',
        name: 'Admin',
        description: 'Admin',
      },
    ];
    const permissionIds = [
      '385b6b57-0997-4392-b014-db56f3a420d0',
      'dc8ef815-a242-4e61-aaf2-3c18101702a7',
    ];
    setTimeout(async () => {
      for (const role of roleList) {
        const roleExists = await this.findOne({
          name: role.name,
          description: role.description,
        });
        if (!roleExists?.id) {
          const newRole = await this.create<Partial<Roles>>(role);
          if (newRole?.id) {
            console.log({ lego: permissionIds.map((permissionTypeId) => ({
              permissionTypeId,
              roleId: newRole.id,
            }))})
            const newPermissions = await this.rolePermissionSrv.createMany<
              Partial<RolePermissions>
            >(
              permissionIds.map((permissionTypeId) => ({
                permissionTypeId,
                roleId: newRole.id,
              })),
            );
            console.log({ newPermissions });
          }
        }
      }
    }, 5000);
  }
}
