import { compare, genSalt, hash } from 'bcrypt';
import { BeforeCreate, BeforeUpdate, Column, DataType, Default, Model, Table } from 'sequelize-typescript';
import { UserRoles } from '../common/constants/user-roles.const';

@Table
export default class User extends Model<User> {
  @Column
  email: string;

  @Column
  name: string;

  @Column
  password: string;

  @Default(UserRoles.USER)
  @Column(DataType.TEXT)
  role: UserRoles;

  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(instance: User) {
    const salt = await genSalt(8);
    instance.password = await hash(instance.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  toJSON(): User {
    const value = { ...this.get() };
    delete value.password;
    delete value.created;
    return value;
  }
}