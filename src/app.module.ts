import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Mysql } from './database/mysql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';
import { RedirectController } from './url/url.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
