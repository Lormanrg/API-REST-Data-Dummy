import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
  imports: [PostsModule],
})
export class CommentsModule {}
