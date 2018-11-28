import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { UserRoles } from '../common/constants/user-roles.const';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { RegisterFormModel } from './models/register-form.model';
import { SignInModel } from './models/sign-in.model';
import { UpdatePasswordModel } from './models/update-password.model';
import { UpdateUserFormModel } from './models/update-user-form.model';
import User from './user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiUseTags('Users')
@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  findAll(): Promise<User[]> {
    return this._userService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() request): Promise<User> {
    return this._userService.findById(request.user.id);
  }

  @Post()
  create(@Body() userForm: RegisterFormModel): Promise<User> {
    return this._userService.create(userForm);
  }

  @Post('token')
  getToken(@Body() userTokenAccessModel: SignInModel): Promise<{ data: User, token: string }> {
    return this._userService.getToken(userTokenAccessModel);
  }

  @Put()
  @UseGuards(AuthGuard)
  update(
    @Body() userFrom: UpdateUserFormModel,
    @Req() request,
  ): Promise<User> {
    return this._userService.update(request.user.id, userFrom);
  }

  @Put('password')
  @UseGuards(AuthGuard)
  updatePassword(
    @Body() updatePassword: UpdatePasswordModel,
    @Req() request,
  ): Promise<null> {
    return this._userService.updatePassword(request.user.id, updatePassword);
  }
}

