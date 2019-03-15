import { Global, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import Product from './product.entity';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'ProductRepository',
      useValue: Product,
    },
  ],
})
export class ProductModule {
}
