import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExist extends HttpException {
  constructor() {
    super(
      'Пользователь с таким номером телефона уже существует',
      HttpStatus.BAD_REQUEST,
    );
  }
}
