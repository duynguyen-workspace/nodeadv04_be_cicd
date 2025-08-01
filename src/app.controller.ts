import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

class DemoDTO {
    @ApiProperty({name: "name", type: String, default: "Abc"})
    name: String

    @ApiProperty({name: "age", type: String, default: "90"})
    age: Number

    @ApiProperty({name: "phone", type: String, default: "012345678"})
    phone: String

    @ApiProperty({name: "email", type: String, default: "abc@gmail.com"})
    email: String
}

@ApiTags("duy")
@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // decorator: khai báo chức năng, bắt đầu bằng dấu @

  @Get() // -> endpoint: "/"
  getHello(): string {
    return "Hello 1";
  }

  @ApiQuery({name: "name", description: "Enter user's name", type: String})
  @ApiQuery({name: "age", description: "Enter user's name", type: Number})
  @Get('demo-query')
  getDemoQuery(
    @Query("name") user_name,
    @Query("age") user_age
  ) {
    return {user_name, user_age}
  }

  @ApiParam({name: "product_id", type: Number})
  @ApiParam({name: "order_id", type: Number})
  @Get("demo-param/:product_id/:order_id")
  getDemo(
    // @Req() req, // Ctrl / Cmd + i
    @Param("product_id") product_id,
    @Param("order_id") order_id
  ) {
    // request: 2 loại - params, body (json)

    /* Các loại params (parameters): 
    1. query param (query string). VD: localhost:8080/demo?name=abd&age=18
    2. route param. VD: localhost:8080/demo/products/1 (:id)
    */

    // const { name, age } = req.query

    // const { product_id, order_id } = req.params

    return { product_id, order_id }
  } 

  @ApiBody({type: DemoDTO})
  @Post("demo-body")
  getDemoBody(
    // @Req() req
    @Body() body
  ) {
    return {
      message: "Success",
      statusCode: 200,
      data: body
    }
  }

  // method: RESTFUL, GRAPHQL
  // RESTFUL API: GET (read), POST (create), PUT (update), DELETE (delete)

  
}

  