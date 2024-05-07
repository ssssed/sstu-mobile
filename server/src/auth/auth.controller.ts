import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUser } from './dto/response-user';
import { AuthUserDto } from './dto/auth-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Авторизация пользователя',
    type: ResponseUser,
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthUserDto) {
    return this.authService.signin(dto);
  }

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Регистрация пользователя',
    type: ResponseUser,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
