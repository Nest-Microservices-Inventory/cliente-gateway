import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { RegisterUserDto } from './dto/register-user.dto';
import { catchError } from 'rxjs';
import { error } from 'console';
import { LoginUserDto } from './dto/login-user.dto';
import { Token } from './decorators/token.decorator';
import { AuthGuard } from './guards/auth.guad';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }


  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.user.register', registerUserDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.user.login', loginUserDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verify(@Token() token: string) {
    return this.client.send('auth.user.verify', token)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }
}
