import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionService } from './role-permission.service';
import { RolePermissions } from '../../entities/role-permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissions])],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
