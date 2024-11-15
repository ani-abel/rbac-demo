import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { Roles } from '../../entities/role.entity';
import { RolePermissionModule } from '../role-permission/role-permission.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Roles]), RolePermissionModule],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
