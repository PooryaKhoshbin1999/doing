import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authServce: AuthService) {}

  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    return this.authServce.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authServce.login(body.email, body.password);
  }
}
