import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersProvider } from './entities/users.provider';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersValidator } from './users.validator';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...UsersProvider, UsersRepository, UsersValidator],
  exports: [UsersService, ...UsersProvider],
})
export class UsersModule {}
