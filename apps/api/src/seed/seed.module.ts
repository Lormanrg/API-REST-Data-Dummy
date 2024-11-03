import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Module({
  controllers: [SeedController],
  providers: [SeedService, PrismaService, AxiosAdapter],
  exports: [SeedService],
  imports: [UsersModule],
})
export class SeedModule {}
