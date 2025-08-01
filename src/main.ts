import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, document)

  await app.listen(8080);
}
bootstrap();

// TODO: CẤU TRÚC CỦA MỘT ĐỐI TƯỢNG 
// 1. module: quản lý và kết nối các đối tượng với nhau (controller và service)
// module gốc - App Module
// 2. controller: quản lý và xây dựng API
// 3. service: xây dựng logic cho controller

// mvc - model controller view (DTO và DAO)

// TODO: KẾT NỐI CSDL
// C1: truyền thống - chuỗi kết nối 
// C2: ORM (object relation model) -> sử dụng 1 dịch vụ chuyển đổi từ CSDl -> mô hình object

// DTO, entity (model) -> OOP thuần

// tải thư viện mysql2 -> mysql2.connection(url, database, host, port...) -> dùng câu lệnh "SQL" để thao tác dữ liệu

// TODO: CÁC BƯỚC SETUP ORM - PRISMA
/*
1. yarn add prisma @prisma/client
2. yarn prisma init
3. Update file .env (DATABASE_URL) và sửa file schema
4. yarn prisma db pull -> (kéo) đồng bộ CSDL về BE 
5. yarn prisma generate
(khi đổi vị trí thư mục prisma -> thêm tag --schema "path")

*/


// nodemon (track thay đổi file) -> yarn start:dev 