import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Url } from './dto/url';
import * as bcrypt from 'bcryptjs';
import { UrlEntity } from './entities/url.entity';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(UrlEntity) private user: typeof UrlEntity,
    @Inject(UrlRepository) private readonly usersRepository: UrlRepository,
  ) {}

  async create(body: Url) {
    try {
      return "criado"
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  
}
