import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { NatsModule } from './transports/nats/nats.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, NatsModule, OrdersModule],
})
export class AppModule {}
