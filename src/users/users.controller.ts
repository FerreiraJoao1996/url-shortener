import { Body, Controller, Post, BadRequestException, Put, Param, Get, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersValidator } from './users.validator';
import { User } from './dto/user';

@Controller('users')
export class UsersController {
	constructor(
		private readonly userService: UsersService,
		private readonly userValidator: UsersValidator
	) { }

	@Post('create')
	async create(@Body() request: User) {
		await this.userValidator.create(request);
		return await this.userService.create(request);
	}

	@Put('update/:id')
	async update(@Param('id') id: string, @Body() request: User) {
		request.id = id;
		await this.userValidator.update(request);
		const user = await this.userService.update(request);

		if (user) {
			return "Usuário atualizado com sucesso!"
		}
	}

	@Get('find/:id')
	async find(@Param('id') id: string) {
		const user = await this.userService.find(id);
		if (user) {
			return user;
		}
	}
	
	@Delete('delete/:id')
	async delete(@Param('id') id: string) {
		await this.userService.delete(id);
		return "Usuário deletado com sucesso!"
	}
}
