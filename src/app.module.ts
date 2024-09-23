import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Mysql } from './database/mysql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';
import { RedirectController } from './url/url.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "mysql", 
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
    UsersModule,
    AuthModule,
    UrlModule,
  ],
  controllers: [RedirectController],
  providers: [...Mysql],
  exports: [...Mysql],
})
export class AppModule {}
