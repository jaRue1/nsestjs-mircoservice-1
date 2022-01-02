import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';
                                                                                  //global-prefix
@Controller('products') // this prefix is the api endpoint Ex http://localhost:8000/api/products
export class ProductController {
  // CRUD FUNCTIONALITY FOR NEST JS

  constructor(private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy){}

  // Create a product 
  @Post()
  create(
    @Body( 'title') title: string,
    @Body('image') image: string
  )
  {
    return this.productService.create({title,image});
  }
  
  // Read || get all the products
  @Get() // decorator which describes the behavior of the function
  all(){
      this.client.emit('hello','hello from rabbitMQ') // how we send messages to rabbitMQ
      return this.productService.all();
  }

  // Get product by id
  @Get(':id')
  async get(@Param ('id') id:number){
    return this.productService.get(id);
  }

  // Update by id 
  @Put(':id')
  async update(
    @Param ('id') id:number,
    @Body( 'title') title: string,
    @Body('image') image: string)
    {
    return this.productService.update(id, {title,image});
  }

  // Delete by id 
  @Delete(':id')
  async delete(@Param ('id') id:number ){
    return this.productService.delete(id);
  }
}
 