import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserFormModel {
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty({required: true})
  email: string;

  @IsNotEmpty()
  @ApiModelProperty({required: true})
  name: string;
}