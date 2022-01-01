import { Body, Controller, Get, Post} from '@nestjs/common';
import { ProductService } from './product.service';
                                                                                  //global-prefix
@Controller('products') // this prefix is the api endpoint Ex http://localhost:8000/api/products
export class ProductController {

  constructor(private productService: ProductService){}

  @Get() // decorator which describes the behavior of the function
    all(){
      return this.productService.all();
    }
  @Post()
  create(
    @Body( 'title') title: string,
    @Body('image') image: string
  )
  {
    return this.productService.create({title,image})
  }
}
 