import { Injectable } from '@nestjs/common';
import { ValidatorFieldService } from 'src/utils/validator/validator.service';

@Injectable()
export class UrlValidator {
  async url(request): Promise<void> {
    const validatorQuery = new ValidatorFieldService(request.params, {
      url: 'required|string',
    });
    await validatorQuery.validation();
  }
}
