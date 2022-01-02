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
   async create(
    @Body( 'title') title: string,
    @Body('image') image: string
  )
  { 
    const product =  await this.productService.create({title,image});

    this.client.emit('product_created',product) // sending the product_created to rabbitMQ

    return product;
  }
  
  // Read || get all the products
  @Get() // decorator which describes the behavior of the function
  async all(){

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
      await this.productService.update(id, {title,image});

      const product = await this.productService.get(id);

      this.client.emit('product_updated',product)// sending the product_updated to rabbitMQ

    return product
  }

  // Delete by id 
  @Delete(':id')
  async delete(@Param ('id') id:number ){
    
    await this.productService.delete(id);

    this.client.emit('product_deleted',id) // sending the product_deleted to rabbitMQ
  }

  @Post(':id/like')
  async like(@Param ('id') id: number){
    const product = await this.productService.get(id);

    return this.productService.update(id,{

      likes: product.likes + 1

    })

  }
  
}
 