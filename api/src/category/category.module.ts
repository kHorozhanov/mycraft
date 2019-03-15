import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import Category from './category.entity';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: 'CategoryRepository',
      useValue: Category
    }
  ]
})
export class CategoryModule {}
