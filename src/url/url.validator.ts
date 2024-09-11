import { Injectable } from '@nestjs/common';
import { ValidatorFieldService } from 'src/utils/validator/validator.service';
import { Url } from './dto/url';

@Injectable()
export class UrlValidator {
	async create(request: Url): Promise<void> {
		const validatorField = new ValidatorFieldService(request, {
			url: 'required|string',
		});
		await validatorField.validation();
	}
}
