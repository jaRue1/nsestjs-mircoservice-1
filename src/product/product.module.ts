import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://aivvmtwd:0Bc-LGbx7mHZP7os4ydYeIpE49Pz_n86@tiger.rmq.cloudamqp.com/aivvmtwd'],
        queue: 'admin_queue_2',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),], // entity
  controllers: [ProductController], providers: [ProductService]
})
export class ProductModule {}
