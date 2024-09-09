import { Injectable } from '@nestjs/common';
import { ValidatorFieldService } from 'src/utils/validator/validator.service';
import { User } from './dto/user';

@Injectable()
export class UsersValidator {
  async create(request: User): Promise<void> {
    const validatorField = new ValidatorFieldService(request, {
      name: 'required|string',
      lastname: 'required|string',
      email: 'required|string',
      password: 'required|string',
      confirmPassword: 'required|string'
    });
    await validatorField.validation();
  }
}
