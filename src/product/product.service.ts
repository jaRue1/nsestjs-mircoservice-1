import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import {Repository} from "typeorm"

@Injectable()
export class ProductService {
  constructor( 
    @InjectRepository(Product) private readonly productRepository: Repository<Product>) // How to establish connection with DB
    {

    }
// type of method - and name 
  async all(): Promise<Product[]> { // retrieve all products 
    return this.productRepository.find();
  }

  async create(data): Promise<Product>{ // sending data to repository
    return this.productRepository.save(data);
  }
}
