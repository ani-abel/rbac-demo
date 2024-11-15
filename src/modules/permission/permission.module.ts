import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './permission.service';
import { PermissionTypes } from '../../entities/permission.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PermissionTypes])],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
