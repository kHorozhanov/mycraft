import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '../services/config.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private _config: ConfigService) {
  }

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      try {
        const tokenParts = req.headers['authorization'].split(' ');
        const isBearer = tokenParts[0] ! === 'Bearer';
        if (isBearer && tokenParts.length === 2) {
          req.user = verify(tokenParts[1], this._config.get('SECRET'));
        }
        next();
      } catch (e) {
        next();
      }
    };
  }
}