import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UrlEntity } from './entities/url.entity';

@Injectable()
export class UrlRepository {
  constructor(@InjectModel(UrlEntity) private user: typeof UrlEntity) {}

  async find(email: string): Promise<UrlEntity> {
    return await this.user.findOne<UrlEntity>({
      where: {
        // email: email,
      },
    });
  }
}
