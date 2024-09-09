import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryTypes } from 'sequelize';
import { Mysql } from 'src/database/mysql';

export class ValidatorFieldService {
  private request: any;
  private rules: Record<string, string>;

  constructor(request: any, rules: Record<string, string>) {
    this.request = request;
    this.rules = rules;
  }

  async validation(): Promise<void> {
    const errors: Record<string, any> = {};

    for (const [field, rule] of Object.entries(this.rules)) {
      if (
        rule.includes('required') &&
        (!this.request[field] || this.request[field].trim() === '')
      ) {
        errors[field] = {
          message: `${field} field must not be empty.`,
          rule: 'required',
        };
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new BadRequestException({ code: 400, errors });
    }
  }

  async databaseValidation(query: string, values: Array<string>) {
    const sequelize = await Mysql?.[0]?.useFactory(new ConfigService());

    if (!sequelize) {
      throw new Error('Invalid database connection');
    }

    const result = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.SELECT,
    });

    return result;
  }
}
