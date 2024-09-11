import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlRepository } from './url.repository';
import { UrlController } from './url.controller';
import { UrlValidator } from './url.validator';
import { UrlProvider } from './entities/url.provider';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [UrlService, ...UrlProvider, UrlRepository, UrlValidator],
  exports: [UrlService, ...UrlProvider],
})
export class UrlModule {}
