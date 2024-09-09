import {
    Column,
    CreatedAt,
    Model,
    Table,
    UpdatedAt,
    DeletedAt
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'users',
  })
  export class UsersEntity extends Model<UsersEntity> {
    @Column
    name: string;
  
    @Column
    lastname: string;
    
    @Column
    username: string;
  
    @Column
    email: string;
  
    @Column
    password: string;
  
    @CreatedAt
    @Column
    created_at!: Date;
  
    @UpdatedAt
    @Column
    updated_at!: Date;

    @DeletedAt
    @Column
    deleted_at!: Date;
  }
  