import { Global, Module } from '@nestjs/common';
import { PrismaMysqlService, PrismaPostgresService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaMysqlService, PrismaPostgresService],
  exports: [PrismaPostgresService, PrismaMysqlService]
})
export class PrismaModule {}
