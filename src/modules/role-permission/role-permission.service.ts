import { Injectable } from '@nestjs/common';
import { RolePermissions } from '../../entities/role-permissions.entity';
import { GenericService } from '../../services/generic.service';

@Injectable()
export class RolePermissionService extends GenericService(RolePermissions) {}
