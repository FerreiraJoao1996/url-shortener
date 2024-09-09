import { Logger } from '@nestjs/common';

export abstract class ValidatorAbstract {
  protected jsonObjectValidation: Record<string, any> = {};

  private static readonly logger = new Logger(ValidatorAbstract.name);

  constructor() {
    this.jsonObjectValidation = {};
  }

  protected throwNotImplementedError(request: any): never {
    ValidatorAbstract.logger.log(`Not implemented method called with request: ${JSON.stringify(request)}`);
    throw new Error('Function not implemented!');
  }

  async get(request: any): Promise<any> {
    this.throwNotImplementedError(request);
  }

  async store(request: any): Promise<any> {
    this.throwNotImplementedError(request);
  }

  async update(request: any): Promise<any> {
    this.throwNotImplementedError(request);
  }

  async delete(request: any): Promise<any> {
    this.throwNotImplementedError(request);
  }
}
