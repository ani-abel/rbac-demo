import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RbacModule } from './modules/rbac/rbac.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RolePermissionModule } from './modules/role-permission/role-permission.module';
import { UserModule } from './modules/user/user.module';
import ormConfig from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    RbacModule,
    PermissionModule,
    RoleModule,
    RolePermissionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
