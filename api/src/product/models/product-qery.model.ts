import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayUnique, IsNumber, Min } from 'class-validator';

export class ProductQeryModel {
  @Min(1)
  @IsNumber({ allowNaN: false })
  @Transform(value => Number(value))
  @ApiModelProperty({ required: false , type: Number})
  page = 1;

  @Min(1)
  @IsNumber({ allowNaN: false })
  @Transform(value => Number(value))
  @ApiModelProperty({ required: false, type: Number })
  perPage = 20;

  @Min(1, {each: true})
  @ArrayUnique()
  @IsNumber({ allowNaN: false }, { each: true })
  @Transform((value) => {
    return Array.isArray(value) ? value.map(item => Number(item)) : [Number(value)];
  })
  @ApiModelProperty({ isArray: true, type: Number, required: false })
  categories = [];

  @Min(0)
  @IsNumber({ allowNaN: false })
  @Transform(value => Number(value))
  @ApiModelProperty({ required: false, type: Number })
  minPrice = 0;

  @IsNumber({ allowNaN: false })
  @Transform(value => Number(value))
  @ApiModelProperty({ required: false, type: Number })
  maxPrice = 9999999;
}