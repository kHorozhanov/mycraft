import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { PaginationModel } from '../common/models/pagination.model';
import { ProductQeryModel } from './models/product-qery.model';
import { ProductFormModel } from './models/product-form.model';
import Product from './product.entity';
import { ProductService } from './product.service';

@ApiBearerAuth()
@ApiUseTags('Products')
@Controller('products')
export class ProductController {
  constructor(private _productService: ProductService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() product: ProductFormModel, @Req() request): Promise<Product> {
    return this._productService.create({
      ...product,
      userId: request.user.id,
    });
  }

  @Get(':id')
  getProduct(@Param('id') id: number): Promise<Product> {
    return this._productService.findById(id);
  }

  @Get()
  async find(@Query() query: ProductQeryModel): Promise<{
    filters: Partial<ProductQeryModel>,
    result: PaginationModel<Product>
  }> {
    const result = await this._productService.findAll(query);
    return {
      result,
      filters: {
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        categories: query.categories,
      },
    };
  }
}
