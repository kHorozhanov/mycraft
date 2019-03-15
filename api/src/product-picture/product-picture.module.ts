import { Global, Module } from '@nestjs/common';
import { diskStorage } from 'multer';
import { ProductPictureController } from './product-picture.controller';
import ProductPicture from './product-picture.entity';
import { ProductPictureService } from './product-picture.service';

@Global()
@Module({
  controllers: [ProductPictureController],
  providers: [
    ProductPictureService,
    {
      provide: 'ProductPictureRepository',
      useValue: ProductPicture,
    },
  ],
  exports: ['ProductPictureRepository']
})
export class ProductPictureModule {
}
