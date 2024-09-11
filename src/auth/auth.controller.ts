import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Auth } from './dto/auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() request: Auth) {
    return await this.authService.login(request.email, request.password);
  }
}
