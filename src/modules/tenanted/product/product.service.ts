import { Inject, Injectable } from '@nestjs/common';
import { TENANT_DATABASE_CONNECTION } from '@shared/constants';
import { Connection, Repository } from 'typeorm';
import { PostProductDto } from './dto/post-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private productReposity: Repository<Product>;

  constructor(@Inject(TENANT_DATABASE_CONNECTION) dbConnection: Connection) {
    this.productReposity = dbConnection.getRepository(Product);
  }

  async postProduct(product: PostProductDto) {
    return this.productReposity.save(product);
  }

  async getProducts() {
    return this.productReposity.find();
  }
}
