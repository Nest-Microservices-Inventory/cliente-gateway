import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {

  constructor(
    @Inject(NATS_SERVICE) private readonly ordersClient: ClientProxy
  ) { }

    @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send("createOrder", createOrderDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get()
  findAll() {
    return this.ordersClient.send("findAllOrders", {})
      .pipe(
        catchError(error => {
          console.log(error)
          throw new Error("an error happened")
        })
      )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send("findOneOrder", id)
      .pipe(
        catchError(error => {
          console.log(error)
          throw new Error("an error happened")
        })
      )
  }
}
