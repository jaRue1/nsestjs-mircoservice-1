import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import {Repository} from "typeorm"

@Injectable()
export class ProductService { //  Used to interact with db
  constructor( 
    @InjectRepository(Product) private readonly productRepository: Repository<Product>) // How to establish connection with DB
    {

    }
  // 
  async all(): Promise<Product[]> { // retrieve all products 
    return this.productRepository.find();
  }
  // 
  async create(data): Promise<Product>{ // sending data to repository
    return this.productRepository.save(data);
  }
  // 
  async get(id: number) : Promise<Product> { // find product by id
    return this.productRepository.findOne({id});
  }
  // 
  async update(id: number, data) : Promise<any> { // update by id 
    return this.productRepository.update(id, data );
  }
  //
  async delete(id:number) : Promise<any> { // delete by id
    return this.productRepository.delete(id);
  }
}
