import { CorsMiddleware } from '@nest-middlewares/cors';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CommonModule } from './common/common.module';
import { UserMiddleware } from './common/middlewares/user.middleware';
import { ConfigService } from './common/services/config.service';
import { ProductPictureModule } from './product-picture/product-picture.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    ProductModule,
    CategoryModule,
    ProductPictureModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('*');
    CorsMiddleware.configure({
      origin: (origin, callback) => {
        const pattern = ConfigService.get('ENV') === 'production' ?
          /https?:\/\/(api.)?mycraft.com.ua/ :
          /http:\/\/localhost:\d{4}/;
        !origin || pattern.test(origin) ?
          callback(null, true) :
          callback(new Error('Not allowed by CORS'));
      },
      optionsSuccessStatus: 200,
    });
    consumer
      .apply(CorsMiddleware)
      .forRoutes('*');
  }
}
