import { Injectable } from '@nestjs/common';
import { ValidatorFieldService } from 'src/utils/validator/validator.service';

@Injectable()
export class UsersValidator {
  async create(request): Promise<void> {
    const validatorField = new ValidatorFieldService(request.body, {
      name: 'required|string',
      lastname: 'required|string',
      email: 'required|string',
      password: 'required|string',
      confirmPassword: 'required|string',
    });
    await validatorField.validation();
  }

  async update(request): Promise<void> {
    const validatorField = new ValidatorFieldService(request.body, {
      name: 'string',
      lastname: 'string',
      email: 'string',
      password: 'string',
      confirmPassword: 'string',
    });
    await validatorField.validation();

    const validatorQuery = new ValidatorFieldService(request.params, {
      id: 'required|string',
    });
    await validatorQuery.validation();
  }

  async id(request): Promise<void> {
    const validatorQuery = new ValidatorFieldService(request.params, {
      id: 'required|string',
    });
    await validatorQuery.validation();
  }
}
