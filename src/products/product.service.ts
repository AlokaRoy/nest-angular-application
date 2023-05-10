import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findOne(id: string): Promise<Product> {
    return this.products.find(product => product.id === id);
  }

  async create(product: Product): Promise<Product> {
    product.id = uuidv4();
    this.products.push(product);
    return product;
  }

  async update(id: string, product: Product): Promise<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { id, ...product };
      return this.products[index];
    }
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter(product => product.id !== id);
  }
}
