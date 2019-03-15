import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInModel {
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  email: string;

  @MinLength(5)
  @IsNotEmpty()
  @ApiModelProperty({ minimum: 5, required: true })
  password: string;
}