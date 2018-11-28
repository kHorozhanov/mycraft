import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../common/services/config.service';
import { RegisterFormModel } from './models/register-form.model';
import { SignInModel } from './models/sign-in.model';
import { UpdatePasswordModel } from './models/update-password.model';
import { UpdateUserFormModel } from './models/update-user-form.model';
import User from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private _userRepository: typeof User,
    private _config: ConfigService,
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this._userRepository.findAll<User>();
  }

  async create(userForm: RegisterFormModel): Promise<User> {
    return await this._userRepository.create<User>(userForm);
  }

  async update(id: number, userForm: UpdateUserFormModel): Promise<User> {
    const user = await this.findById(id);
    user.set(userForm);
    await user.save();
    return user;
  }

  async updatePassword(id: number, updatePassword: UpdatePasswordModel): Promise<null> {
    const user = await this.findById(id);
    if (updatePassword.password !== updatePassword.confirmation) {
      throw new BadRequestException(`New passwords not equals`);
    }
    if (!(await user.comparePassword(updatePassword.oldPassword))) {
      throw new BadRequestException(`Invalid password`);
    }
    user.set('password', updatePassword.password);
    await user.save();
    return null;
  }

  async getToken({ email, password }: SignInModel): Promise<{ data: User, token: string }> {
    const user = await this._userRepository.findOne<User>({ where: { email } });
    if (!user || !await user.comparePassword(password)) {
      throw new BadRequestException(`Invalid email or password`);
    }
    return {
      data: user,
      token: sign({ id: user.id, role: user.role }, this._config.get('SECRET')),
    };
  }

  async findById(id: number): Promise<User> {
    return await this._userRepository.findById<User>(id);
  }
}
