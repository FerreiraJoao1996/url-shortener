import { Inject, Injectable } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersEntity) private user: typeof UsersEntity,
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
  ) { }

  async create(body: any) {
    return "rota de criação"
  }
}
