import {
    Column,
    CreatedAt,
    Model,
    Table,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
    PrimaryKey,
  } from 'sequelize-typescript';
import { UsersEntity } from 'src/users/entities/users.entity';
  
  @Table({
    tableName: 'url',
  })
  export class UrlEntity extends Model<UrlEntity> {
    @PrimaryKey
    @Column
    id!: number;

    @ForeignKey (()=> UsersEntity)
    @Column
    user_id: number;

    @Column
    original_url: string;

    @Column
    short_url: string;
  
    @Column
    number_clicks: number;
  
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
  