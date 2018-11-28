import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordModel {
  @MinLength(5)
  @IsNotEmpty()
  @ApiModelProperty({minimum: 5, required: true})
  oldPassword: string;

  @MinLength(5)
  @IsNotEmpty()
  @ApiModelProperty({minimum: 5, required: true})
  password: string;

  @MinLength(5)
  @IsNotEmpty()
  @ApiModelProperty({minimum: 5, required: true})
  confirmation: string;
}