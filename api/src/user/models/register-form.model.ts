import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SignInModel } from './sign-in.model';

export class RegisterFormModel extends SignInModel {
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  name: string;
}