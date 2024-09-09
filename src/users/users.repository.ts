import { Injectable } from '@nestjs/common';

import { Op } from 'sequelize';
import { UsersEntity } from './entities/users.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(UsersEntity) private user: typeof UsersEntity) {}
  
  async find(userId: number): Promise<UsersEntity> {
    return await this.user.findOne<UsersEntity>({
      where: {
        id: userId,
      },
    });
  }
}
