import {
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlValidator } from './url.validator';
import { Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly urlValidator: UrlValidator,
  ) {}

  @Post('create')
  async create(@Request() request, @Headers() headers: Record<string, any>) {
    await this.urlValidator.create(request);
    
    return await this.urlService.create(request.body, headers['authorization'] ?? null);
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