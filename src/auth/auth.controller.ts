import { Controller, Post } from '@nestjs/common';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {

  @Post('signup')
  signup() {
    return { message: 'User signed up successfully' };
  }

  @Post('signin')
  signin() {
    return { message: 'User signed in successfully' };
  }
}
