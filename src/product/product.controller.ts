import { Controller, Get, Post, Put, Patch, Param, Body, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/product/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return await this.productService.create(product);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() product: Product): Promise<Product> {
    product.id = id;
    return await this.productService.update(product);
  }

  @Patch(':id/deduct/:quantity')
  async deductInventory(
    @Param('id') id: number,
    @Param('quantity') quantity: number,
  ): Promise<Product> {
    return await this.productService.deductInventory(id, quantity);
  }

  @Patch(':id/add/:quantity')
  async addInventory(
    @Param('id') id: number,
    @Param('quantity') quantity: number,
  ): Promise<Product> {
    return await this.productService.addInventory(id, quantity);
  }
}
