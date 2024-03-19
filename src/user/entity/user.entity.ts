import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    transformer: {
      to: (value) => {
        return value;
      },
      from: (value) => {
        return new Date(value).getTime();
      },
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    transformer: {
      to: (value) => {
        return value;
      },
      from: (value) => {
        return new Date(value).getTime();
      },
    },
  })
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
