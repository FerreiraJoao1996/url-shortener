import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersValidator } from './users.validator';
import { User } from './dto/user';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly userValidator: UsersValidator
  ) {}

  @Post('create')
  async create(@Body() request: User) {
    try {
      await this.userValidator.create(request);
      return await this.userService.create(request);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Ocorreu um erro durante a requisição. Erro: ${error.message}`);
    }
  }
}
