import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Roles } from './role.entity';

@Entity({ name: 'Users' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'uuid' })
  roleId: string;

  @JoinColumn({ name: 'roleId' })
  @ManyToOne(() => Roles, ({ users }) => users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: Roles;

  @CreateDateColumn()
  dateCreated: Date;

  @BeforeInsert()
  addId(): void {
    this.id = uuidV4();
  }
}
