import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Category from '../category/category.entity';
import ProductPicture from '../product-picture/product-picture.entity';
import User from '../user/user.entity';

@Table
export default class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  price: number;

  @Column
  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @Column
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ProductPicture)
  pictures: ProductPicture[];
}