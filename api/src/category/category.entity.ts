import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Product from '../product/product.entity';

@Table
export default class Category extends Model<Category> {
  @Column
  name: string;

  @HasMany(() => Product)
  products: Product[]
}