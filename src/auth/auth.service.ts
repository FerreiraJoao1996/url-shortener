import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService
  ) {}

  async login(email: string, pass:string): Promise<{access_token: string}> {
    const user = await this.usersService.findByEmail(email);

    const validPassword = await bcrypt.compare(pass, user.password);
	
    if(!validPassword) {
      throw new UnauthorizedException();
    }

	const payload = { sub: user.id, email: user.email};

  return {
    access_token: await this.jwtService.signAsync(payload)
  }
	
  }
}
