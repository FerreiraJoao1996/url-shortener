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
  ) {}

  async create(body: User) {
    try {
      const hasUser = await UsersEntity.findOne({
        where: { email: body.email },
      });

      if (hasUser) {
        throw new Error('Usuário já existe, por favor realize o login!');
      }

      if (body.password !== body.confirmPassword) {
        throw new Error('As senhas informadas não coincidem!');
      }

      const passwordHash = await bcrypt.hash(body.password, 10);
      body.password = passwordHash;

      const user = await this.user.create(body);
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(body: User) {
    try {
      if (!body.id) throw new Error('ID inválido ou não existe!');

      const user = await UsersEntity.findByPk(body.id);

      if (!user) throw new Error('Usuário não encontrado!');

      const newUser = await UsersEntity.update(body, {
        where: { id: body.id },
      });

      return newUser;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async find(id: string) {
    try {
      if (!id) throw new Error('ID inválido ou não existe!');

      const user = await UsersEntity.findOne({
        where: { id: id },
      });

      if (!user) throw new Error('Usuário não encontrado!');

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string) {
    try {
      if (!email) throw new Error('Email inválido ou não existe!');

      const user = await UsersEntity.findOne({
        where: { email: email },
      });

      if (!user) throw new Error('Usuário não encontrado!');

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      if (!id) throw new Error('ID inválido ou não existe!');

      const user = await UsersEntity.findByPk(id);

      if (!user) throw new Error('Usuário não encontrado!');

      await UsersEntity.destroy({ where: { id: id } });

      return 'Usuário deletado com sucesso!';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
