import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Users } from './user.entity';
import { RolePermissions } from './role-permissions.entity';

@Entity({ name: 'Roles' })
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  dateCreated: Date;

  @OneToMany(() => RolePermissions, ({ permissionType }) => permissionType, {
    cascade: true,
  })
  rolePermissions: RolePermissions[];

  @OneToMany(() => Users, ({ role }) => role, { cascade: true })
  users: Users[];

  @BeforeInsert()
  addId(): void {
    this.id = uuidV4();
    if (!this.description) {
      this.description = this.name;
    }
  }
}
