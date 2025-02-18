import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import jwtConfig from 'config/jwt.config'; 
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';

@Module({
  imports: [ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard
  ],
})
export class IamModule {}
