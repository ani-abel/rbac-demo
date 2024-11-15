import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Actions, FeatureGroups, Features } from '../utils/util.constant';
import { RolePermissions } from './role-permissions.entity';

@Entity({ name: 'Permissions' })
export class PermissionTypes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: Features })
  feature: Features;

  @Column({ enum: FeatureGroups })
  group: FeatureGroups;

  @Column({ enum: Actions })
  action: Actions;

  @Column({ type: 'varchar', length: 255 })
  label: string;

  @CreateDateColumn()
  dateCreated: Date;

  @OneToMany(() => RolePermissions, ({ permissionType }) => permissionType, { cascade: true })
  rolePermissions: RolePermissions[];

  @BeforeInsert()
  addId(): void {
    this.id = uuidV4();
  }
}
