import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { AuthGuard } from './guards/auth.guard';
import { ConfigService } from './services/config.service';

@Global()
@Module({
  providers: [
    AuthGuard,
    {
      provide: ConfigService,
      useValue: new ConfigService(join(process.cwd(), `env/${process.env.NODE_ENV}.env`)),
    },
  ],
  exports: [
    AuthGuard,
    ConfigService,
  ],
})
export class CommonModule {
}