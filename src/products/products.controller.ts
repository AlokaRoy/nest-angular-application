import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async createProduct(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
