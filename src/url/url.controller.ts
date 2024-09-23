import {
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlValidator } from './url.validator';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly urlValidator: UrlValidator,
  ) {}

  @Post('create')
  async create(@Request() request, @Headers() headers: Record<string, any>) {
    await this.urlValidator.urlCreate(request);
    return await this.urlService.create(
      request.body,
      headers['authorization'] ?? null,
    );
  }

  @UseGuards(AuthGuard)
  @Put('update/:url')
  async update(@Request() request, @Headers() headers: Record<string, any>) {
    await this.urlValidator.url(request);
    const newShortUrl = await this.urlService.update(
      request.params,
      headers['authorization'] ?? null,
    );
    if (newShortUrl) {
      return newShortUrl;
    }
  }

  @UseGuards(AuthGuard)
  @Get('get')
  async get(@Headers() headers: Record<string, any>) {
    const user = await this.urlService.get(headers['authorization'] ?? null);
    if (user) {
      return user;
    }
  }
  @UseGuards(AuthGuard)
  @Get('find/:url')
  async find(@Request() request, @Headers() headers: Record<string, any>) {
    await this.urlValidator.url(request);
    const user = await this.urlService.find(
      request.params.url,
      headers['authorization'] ?? null,
    );
    if (user) {
      return user;
    }
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:url')
  async delete(@Request() request, @Headers() headers: Record<string, any>) {
    await this.urlValidator.url(request);
    return await this.urlService.delete(
      request.params.url,
      headers['authorization'] ?? null,
    );
  }
}

@Controller()
export class RedirectController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const shortUrl = await this.urlService.findByShortCode(shortCode);
    if (!shortUrl) {
      throw new NotFoundException('URL not found');
    }
    await this.urlService.incrementClickCount(shortUrl.short_url);
    res.redirect(shortUrl.original_url);
  }
}
