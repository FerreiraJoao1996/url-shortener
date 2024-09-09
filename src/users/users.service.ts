import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UsersRepository } from './users.repository';
import { User } from './dto/user';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersEntity) private user: typeof UsersEntity,
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
  ) { }

  async create(body: User) {
    try {
      const hasUser = await this.usersRepository.find(body.email);

      if(hasUser) {
        throw new Error("Usuário já existe, por favor realize o login!");
      }

      if(body.password !== body.confirmPassword){
        throw new Error("As senhas informadas não coincidem!");
      }

      const passwordHash = await bcrypt.hash(body.password, 10);
      body.password = passwordHash;

      const user = await this.user.create(body);
      return user;

    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
