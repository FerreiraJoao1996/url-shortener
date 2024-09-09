import { Injectable } from '@nestjs/common';
import { ValidatorFieldService } from 'src/utils/validator/validator.service';

@Injectable()
export class UsersValidator {
  async create(request: any): Promise<void> {
    const validatorField = new ValidatorFieldService(request, {
      name: 'required|string'
    });
    await validatorField.validation();
  }
}
