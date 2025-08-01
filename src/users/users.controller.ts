import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { ApiBody, ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { createTransport } from "nodemailer"

const configEmail = createTransport({
    service: "gmail",
    auth: {
      user: "duynguyen.workspace@gmail.com",
      pass: "aplc yzqv yvet ykhm"
    }
});


class FileUploadDto {
  // @ApiProperty({ type: 'string', format: 'binary' })
  // hinhAnh: any;

  @ApiProperty({ name: "hinhAnh", type: 'string', format: 'binary' })
  file: any;
}

class FilesUploadDto {
  @ApiProperty({ name: "hinhAnh", type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* Khi xây dựng API upload sẽ cần 2 thứ quan trọng
  1. Giảm dung lượng hình ảnh -> giảm kích thước (px) / giảm hình ảnh - tỉ lệ màu (compress-images)
  2. Đổi tên tấm ảnh

  */

  // upload 1 file
  @UseInterceptors(FileInterceptor("hinhAnh", {
    storage: diskStorage({
      destination: './src/public/images', // current working directory
      filename: (req, file, cb) => {
        console.log(file)
        cb(null, new Date().getTime() + "_" + file.originalname)
      }
    })
  }))
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @Post("upload")
  upload(@UploadedFile() file) {
    return file
  }

  // upload nhiều files
  @UseInterceptors(FilesInterceptor("hinhAnh", 10, {
    storage: diskStorage({
      destination: './src/public/images', // current working directory
      filename: (req, file, cb) => {
        // console.log(file)
        cb(null, new Date().getTime() + "_" + file.originalname)
      }
    })
  }))
  @ApiBody({type: FilesUploadDto})
  @ApiConsumes('multipart/form-data')
  @Post('upload-multiple')
  uploadMultiple(@UploadedFiles() files) {
    return files
  }

  @Get("send-email")
  sendEmail() {
    const hello = "hello"
    let info = {
      from: "duynguyen.workspace@gmail.com",
      to: "duynguyen.workspace@gmail.com",
      subject: "Nodeadv04 test mail",
      html: `<h1 style="color: #FF0000">${hello} Kiem tra mail</h1><p>hello 12345</p>` // index.html -> css (inline CSS)
    }

    configEmail.sendMail(info, error => error)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
