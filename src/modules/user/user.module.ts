import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Users } from '../../entities/user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
