import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor() {
    super('Пользователь не найден', HttpStatus.NOT_FOUND);
  }
}
