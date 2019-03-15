import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CategoryFormModel {
  @IsNotEmpty()
  @MinLength(5)
  @ApiModelProperty({ required: true })
  name: string;
}