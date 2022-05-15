import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostProductDto } from './dto/post-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async postProduct(@Body() body: PostProductDto) {
    return this.productService.postProduct(body);
  }

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }
}
