// where controllers and services interact with the model
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'nest_js',
        password: 'Password@123',
        database: 'NESTDB',
        // entities: [""], need to figure this out
        autoLoadEntities: true, // only for development env do not apply this setting to prod
        synchronize: true,
      }),
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
