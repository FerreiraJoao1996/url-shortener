import {HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Url } from './dto/url';
import { UrlEntity } from './entities/url.entity';
import { UrlRepository } from './url.repository';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/users/entities/users.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(UrlEntity) private url: typeof UrlEntity,
    @InjectModel(UsersEntity) private user: typeof UsersEntity,
    @Inject(UrlRepository) private readonly usersRepository: UrlRepository,
    private readonly jwtService: JwtService,
  ) { }

  async create(body: Url, tokenJWT: string): Promise<string> {
    try {

      const userId: number | null = await this.findUserByJWT(tokenJWT);

      const shortCode = this.generateShortCode();

      const url = await UrlEntity.create({
        original_url: body.original_url,
        short_url: shortCode,
        user_id: userId
      });

      return `http://localhost:${process.env.PORT}/${url.short_url}`;

    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  private generateShortCode(): string {
    return randomBytes(3).toString('hex');
  }

  async findByShortCode(shortCode: string): Promise<Url> {
    return await UrlEntity.findOne({ 
      where: { short_url: shortCode },
      raw: true
    });
  }

  async incrementClickCount(shortUrl: string): Promise<void> {
    const url = await UrlEntity.findOne({ where: { short_url: shortUrl } });

    if (!url) {
      throw new Error('URL não encontrada ou inválida!');
    } 

    url.number_clicks++;
    await url.save();
  }

  async findUserByJWT(tokenJWT: string) {
    let userId = null;
    if (tokenJWT !== null) {
      const token = tokenJWT.replace('Bearer ', '');

      let decodedToken;
      try {
        decodedToken = this.jwtService.verify(token);
      } catch (error) {
        throw new HttpException('Token JWT inválido', HttpStatus.UNAUTHORIZED);
      }

      const user = await UsersEntity.findByPk(decodedToken.sub);
      if (!user) throw new Error('Usuário não encontrado!');
      userId = user.id
    }

    return userId;
  }

}
