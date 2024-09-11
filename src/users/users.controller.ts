import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersValidator } from './users.validator';
import { User } from './dto/user';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly userValidator: UsersValidator,
  ) {}

  @Post('create')
  async create(@Body() request: User) {
    await this.userValidator.create(request);
    return await this.userService.create(request);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() request: User) {
    request.id = id;
    await this.userValidator.update(request);
    const user = await this.userService.update(request);

    if (user) {
      return 'Usuário atualizado com sucesso!';
    }
  }

  @UseGuards(AuthGuard)
  @Get('find/:id')
  async find(@Param('id') id: string) {
    const user = await this.userService.find(id);
    if (user) {
      return user;
    }
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
