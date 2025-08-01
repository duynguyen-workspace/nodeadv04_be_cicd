import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaPostgresService, PrismaMysqlService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private prismaPostgres: PrismaPostgresService,
    private prismaMysql: PrismaMysqlService
  ){}

  async create(createProductDto: CreateProductDto) {

    const { name, price, manufacturer } = createProductDto

    await this.prismaPostgres.products.create({
      data: {
        name,
        price,
        manufacturer
      }
    })

    return "Create Successfully!!!"
  }

  findAll() {
    // SELECT * FROM products
    return this.prismaPostgres.products.findMany({
      take: 10
    });
  }

  findAllMysql() {
    // SELECT * FROM products
    return this.prismaMysql.products.findMany({
      take: 10
    });
  }

  findOne(id: number) {
    // SELECT * FROM products WHERE id = 1
    return this.prismaPostgres.products.findMany({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
