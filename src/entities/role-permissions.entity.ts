import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Roles } from './role.entity';
import { PermissionTypes } from './permission.entity';

@Entity({ name: 'RolePermissions' })
export class RolePermissions extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  roleId: string;

  @JoinColumn({ name: 'roleId' })
  @ManyToOne(() => Roles, ({ rolePermissions }) => rolePermissions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: Roles;

  @Column({ type: 'uuid' })
  permissionTypeId: string;

  @JoinColumn({ name: 'permissionTypeId' })
  @ManyToOne(() => PermissionTypes, ({ rolePermissions }) => rolePermissions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  permissionType: PermissionTypes;

  @CreateDateColumn()
  dateCreated: Date;

  @BeforeInsert()
  addId(): void {
    this.id = uuidV4();
  }
}
