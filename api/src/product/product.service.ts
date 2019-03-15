import { Inject, Injectable } from '@nestjs/common';
import { IFindOptions, Sequelize } from 'sequelize-typescript';
import Category from '../category/category.entity';
import { PaginationModel } from '../common/models/pagination.model';
import ProductPicture from '../product-picture/product-picture.entity';
import { ProductFormModel } from './models/product-form.model';
import { ProductQeryModel } from './models/product-qery.model';
import Product from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository') private _product: typeof Product,
    @Inject('ProductPictureRepository') private _productPicture: typeof Product,
    @Inject('SequelizeToken') private _sequelize: Sequelize,
  ) {
  }

  async create({ pictures, ...data }: ProductFormModel): Promise<Product> {
    const transaction = await this._sequelize.transaction();
    try {
      let product = await this._product.create<Product>(data);
      await this._productPicture.update({ productId: product.id }, {
        where: {
          id: pictures.map(({ id }) => id),
        },
      });
      product = await this._product.findById<Product>(product.id, {
        include: [
          ProductPicture,
          Category,
        ],
      });
      transaction.commit();
      return product;
    } catch (e) {
      transaction.rollback();
      throw e;
    }
  }

  async findById(id: number): Promise<Product> {
    return await this._product.findById<Product>(id, {
      include: [
        ProductPicture,
        Category,
      ],
    });
  }

  async findAll(query: ProductQeryModel): Promise<PaginationModel<Product>> {
    const { perPage, page, categories, minPrice, maxPrice } = query;
    const options: IFindOptions<Product> = {
      limit: perPage,
      offset: perPage * (page - 1),
      where: {
        price: {
          [Sequelize.Op.between]: [minPrice, maxPrice],
        },
      },
    };
    if (categories && categories.length) {
      options.where = {
        ...options.where,
        categoryId: categories,
      };
    }
    if (minPrice) {
      options.where = {
        ...options.where,

      };
    }
    const data = await this._product.findAndCountAll<Product>(options);
    return {
      total: data.count,
      items: data.rows,
      perPage,
      page,
    };
  }
}