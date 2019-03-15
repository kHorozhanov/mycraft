import { Controller, FileInterceptor, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import * as mime from 'mime-types';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as uuidv4 from 'uuid/v4';
import { ConfigService } from '../common/services/config.service';
import { ProductPictureService } from './product-picture.service';

@Controller('product-pictures')
export class ProductPictureController {
  constructor(private _productPictureService: ProductPictureService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      files: 1,
      fileSize: 5 * 10000000, // 50 mb in bytes
    },
    storage: diskStorage({
      destination: join(process.cwd(), ConfigService.get('MULTER_DEST')),
      filename: (req, file, cb) => {
        cb(null, uuidv4() + '.' + mime.extension(file.mimetype));
      },
    }),
  }))
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'Picture file' })
  async uploadPicture(@UploadedFile() file) {
    return await this._productPictureService.create(file.filename, file.originalname);
  }
}
