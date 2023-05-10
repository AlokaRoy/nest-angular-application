import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body('username') username: string, @Body('password') password: string) {
    await this.authService.signUp(username, password);
    return { message: 'User has been created' };
  }

  @Post('/login')
  async login(@Body('username') username: string, @Body('password') password: string, @Res() res: any) {
    const response = await this.authService.login(username, password);
    if (response.error) {
      return res.status(401).send({ error: response.error });
    } else {
      const token = response.token;
      res.set('Authorization', `Bearer ${token}`);
      return res.send({ message: 'Logged in successfully', token });
    }
  }  

  @Get('check')
  async checkIfSignedUp(): Promise<boolean> {
    return this.authService.checkIfSignedUp();
  }
}
