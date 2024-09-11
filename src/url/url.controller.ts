import {
  Controller,
  Post,
  Request,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlValidator } from './url.validator';

@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly urlValidator: UrlValidator,
  ) {}

  @Post('create')
  async create(@Request() request) {
    await this.urlValidator.create(request);
    return await this.urlService.create(request);
  }
}
