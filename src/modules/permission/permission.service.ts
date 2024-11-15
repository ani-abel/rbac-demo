import { Injectable, OnModuleInit } from '@nestjs/common';
import { PermissionTypes } from '../../entities/permission.entity';
import { GenericService } from '../../services/generic.service';
import { Actions, FeatureGroups, Features } from '../../utils/util.constant';

@Injectable()
export class PermissionService
  extends GenericService(PermissionTypes)
  implements OnModuleInit
{
  async onModuleInit() {
    const permissionsToCreate = [];
    const permissionList: Partial<PermissionTypes>[] = [
      {
        id: 'c340144e-8cb3-48c1-8478-646a79abad34',
        label: 'Approve Card Request',
        action: Actions.APPROVE,
        feature: Features.CARD_REQUEST,
        group: FeatureGroups.MAINTENANCE_REQUEST,
      },
      {
        id: 'c18b88da-fdc8-43fd-802f-6977f4ea0c1e',
        label: 'Manage all requests',
        action: Actions.MANAGE,
        feature: Features.ALL,
        group: FeatureGroups.MAINTENANCE_REQUEST,
      },
      {
        id: 'cc724cd4-de62-4c7c-851d-ebd05ad0aa7d',
        label: 'Reject Card Request',
        action: Actions.REJECT,
        feature: Features.CARD_REQUEST,
        group: FeatureGroups.MAINTENANCE_REQUEST,
      },
      {
        id: '8cd5beef-1380-4f3c-9b27-7d1ae26bdedd',
        label: 'Read Card Request',
        action: Actions.READ,
        feature: Features.CARD_REQUEST,
        group: FeatureGroups.MAINTENANCE_REQUEST,
      },
      {
        id: '502af512-c090-4643-a695-662e65a6162e',
        label: 'Update Card Request',
        action: Actions.UPDATE,
        feature: Features.CARD_REQUEST,
        group: FeatureGroups.MAINTENANCE_REQUEST,
      },
      {
        id: 'b88a128d-e389-4fa7-9bfb-1ef7213afd5f',
        label: 'Create Card Request',
        action: Actions.CREATE,
        feature: Features.CARD_REQUEST,
        group: FeatureGroups.MAINTENANCE_REQUEST,
      },
      {
        id: '349361d8-473e-41a4-b5e1-f37b3407d780',
        label: 'Manage Card Request',
        action: Actions.MANAGE,
        feature: Features.CARD_REQUEST,
        group: FeatureGroups.MAINTENANCE_REQUEST,
      },
      {
        id: '574fdf23-02fc-4dba-8b26-0552e08c90c4',
        label: 'Delete Card Request',
        action: Actions.DELETE,
        feature: Features.CARD_REQUEST,
        group: FeatureGroups.MAINTENANCE_REQUEST,
      },
    ];
    for (const permission of permissionList) {
      const existingPermission = await this.getRepo().findOne({
        where: {
          action: permission.action,
          feature: permission.feature,
          group: permission.group,
        },
      });
      if (!existingPermission?.id) {
        permissionsToCreate.push(permission);
      }
    }
    if (permissionsToCreate?.length > 0) {
      const newPermissions = await this.createMany(permissionsToCreate);
      console.log({ newPermissions });
    }
  }
}
