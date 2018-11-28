import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import Category from './category.entity';
import { CategoryService } from './category.service';
import { CategoryFormModel } from './models/category-form.model';

@ApiBearerAuth()
@ApiUseTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private _categoryService: CategoryService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() categoryForm: CategoryFormModel): Promise<Category> {
    return this._categoryService.create(categoryForm);
  }
}
