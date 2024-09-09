import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Mysql } from './database/mysql';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [...Mysql],
  exports: [...Mysql],
})
export class AppModule {}
