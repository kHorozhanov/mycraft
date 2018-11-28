import { Inject, Injectable } from '@nestjs/common';
import Category from './category.entity';
import { CategoryFormModel } from './models/category-form.model';

@Injectable()
export class CategoryService {
  constructor(@Inject('CategoryRepository') private _category: typeof Category) {
  }

  async create(categoryForm: CategoryFormModel): Promise<Category> {
    return await this._category.create<Category>(categoryForm);
  }
}