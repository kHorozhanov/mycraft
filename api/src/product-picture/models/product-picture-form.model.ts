import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductPictureFormModel {
  @IsNotEmpty()
  @ApiModelProperty({required: true})
  id: number;

  @IsNotEmpty()
  @ApiModelProperty({required: true})
  src: string;

  @IsNotEmpty()
  @ApiModelProperty({required: true})
  name: string;
}