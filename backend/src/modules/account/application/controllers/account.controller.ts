import { Controller, Post, Body, UnauthorizedException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { RegisterAccountService } from '@/modules/account/application/services/register-account.service';
import { LoginAccountService } from '@/modules/account/application/services/login-account.service';
import { EmailAlreadyExistsError } from '@/modules/account/domain/exceptions/email-already-exists.error';
import { InvalidCredentialsError } from '@/modules/account/domain/exceptions/invalid-credentials.error';

@Controller('account')
export class AccountController {
  constructor(
    private readonly registerService: RegisterAccountService,
    private readonly loginService: LoginAccountService,
  ) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    try {
      await this.registerService.execute(body.name, body.email, body.password);
      return { message: 'Conta criada com sucesso' };
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const token = await this.loginService.execute(body.email, body.password);
      return { token };
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new UnauthorizedException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
