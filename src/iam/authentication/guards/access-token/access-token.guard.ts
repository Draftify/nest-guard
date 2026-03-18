import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../../../../../config/jwt.config";
import { Request } from "express";
import { REQUEST_USER_KEY } from "src/iam/contants/iam.constants";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: Record<string, unknown> =
        await this.jwtService.verifyAsync(token, this.jwtConfiguration);
      (request as unknown as Record<string, unknown>)[REQUEST_USER_KEY] =
        payload;
      console.log(payload);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [, token] = request.headers.authorization?.split(" ") ?? [];
    return token;
  }
}
