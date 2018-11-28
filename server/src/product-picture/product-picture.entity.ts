import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Product from '../product/product.entity';

@Table
export default class ProductPicture extends Model<ProductPicture> {
  @Column
  src: string;

  @Column
  name: string;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}