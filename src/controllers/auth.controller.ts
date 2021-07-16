import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '@services/auth.service';
import { Response } from 'express';
import { SigninUserDto } from 'src/dtos/signin-user.dto';
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  async signInUser(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const jwt = await this.authService.signin(signinUserDto);
    response.cookie('jwt', jwt, { httpOnly: true });
    return { data: jwt };
  }
}
