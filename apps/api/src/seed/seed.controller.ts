import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeedService } from './seed.service';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('getusers')
  executeSeedForUsers() {
    return this.seedService.executedSeedUsers();
  }

  @Get('getposts')
  executeSeedForPosts() {
    return this.seedService.executedSeedPosts();
  }

  @Get('getcomments')
  executeSeedForComments() {
    return this.seedService.executedSeedComments();
  }
}
