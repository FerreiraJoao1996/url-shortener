import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersValidator } from './users.validator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly userValidator: UsersValidator,
  ) {}

  @Post('create')
  async create(@Request() request) {
    await this.userValidator.create(request);
    return await this.userService.create(request.body);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async update(@Request() request) {
    await this.userValidator.update(request);
    const user = await this.userService.update(request.params);

    if (user) {
      return 'Usuário atualizado com sucesso!';
    }
  }

  @UseGuards(AuthGuard)
  @Get('find/:id')
  async find(@Request() request) {
    await this.userValidator.id(request);
    const user = await this.userService.find(request.params.id);
    if (user) {
      return user;
    }
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Request() request) {
    await this.userValidator.id(request);
    return await this.userService.delete(request.params.id);
  }
}
