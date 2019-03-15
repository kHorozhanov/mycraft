import { Inject, Injectable } from '@nestjs/common';
import ProductPicture from './product-picture.entity';

@Injectable()
export class ProductPictureService {
  constructor(
    @Inject('ProductPictureRepository')
    private _pictureRepository: typeof ProductPicture) {
  }

  async create(src: string, name: string): Promise<ProductPicture> {
    return await this._pictureRepository.create<ProductPicture>({ src, name });
  }
}