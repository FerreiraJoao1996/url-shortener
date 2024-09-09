import { Injectable } from '@nestjs/common';

import { Op } from 'sequelize';
import { UsersEntity } from './entities/users.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(UsersEntity) private user: typeof UsersEntity) {}
  
  async find(email: string): Promise<UsersEntity> {
    return await this.user.findOne<UsersEntity>({
      where: {
        email: email,
      },
    });
  }
}
