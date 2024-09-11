import {
    Column,
    CreatedAt,
    Model,
    Table,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
  } from 'sequelize-typescript';
import { UsersEntity } from 'src/users/entities/users.entity';
  
  @Table({
    tableName: 'url',
  })
  export class UrlEntity extends Model<UrlEntity> {
    @Column
    name: string;
  
    @ForeignKey (()=> UsersEntity)
    @Column
    user_id: number;
  
    @Column
    number_clicks: string;
  
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
  