import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsNumber, Min, MinLength, ValidateNested } from 'class-validator';
import { ProductPictureFormModel } from '../../product-picture/models/product-picture-form.model';

export class ProductFormModel {
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  name: string;

  @MinLength(100)
  @ApiModelProperty({ minimum: 100, required: true })
  description: string;

  @Min(0.01)
  @IsNumber({ allowNaN: false })
  @ApiModelProperty({ minimum: 0.01, required: true })
  price: number;

  @IsNotEmpty()
  @ArrayMinSize(3)
  @ArrayMaxSize(18)
  @ValidateNested({ each: true })
  @Type(() => ProductPictureFormModel)
  @ApiModelProperty({
    minItems: 3,
    maxItems: 18,
    required: true,
    isArray: true,
    type: ProductPictureFormModel,
  })
  pictures: ProductPictureFormModel[];

  @IsNumber({ allowNaN: false })
  @ApiModelProperty({ required: true })
  categoryId: number;

  @Exclude()
  userId: number;
}