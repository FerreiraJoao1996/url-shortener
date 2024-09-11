import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Mysql } from './database/mysql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    UrlModule
  ],
  controllers: [],
  providers: [...Mysql],
  exports: [...Mysql],
})
export class AppModule {}
