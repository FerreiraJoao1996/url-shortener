import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'usuarios',
})
export class UsersEntity extends Model<UsersEntity> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  name: string;

  @Column
  lastname: string;

  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;
}
