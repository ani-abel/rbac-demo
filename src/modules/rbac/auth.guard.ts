import {
  CanActivate,
  ExecutionContext,
  Logger,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { decode } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();
    try {
      return await this.validateRequest(req, res);
    } catch (ex) {
      this.logger.error(ex);
      throw new ForbiddenException(ex);
    }
  }

  private async validateRequest(req: Request, res: Response): Promise<boolean> {
    try {
      let returnValue = false;
      const extractedHeaders: any = req.headers;
      if (!extractedHeaders?.authorization) {
        throw new ForbiddenException(
          'Forbidden...Authorization headers were not set',
        );
      }
      const rawToken: string = (extractedHeaders.authorization as string)
        .split(' ')
        .pop();
      let decodedToken: any = decode(rawToken);
      if (decodedToken) {
        decodedToken = {
          iat: decodedToken.iat,
          exp: decodedToken.exp,
          ...JSON.parse(decodedToken.data),
        };
        if (decodedToken) {
          if (Date.now() <= decodedToken.exp * 1000) {
            req['userData'] = { ...decodedToken };
            returnValue = true;
          } else {
            throw new ForbiddenException(
              'Forbidden...You are using an expired token',
            );
          }
        } else {
          throw new ForbiddenException(
            'Forbidden...Authorization headers were not set',
          );
        }
      }
      return returnValue;
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }
}
