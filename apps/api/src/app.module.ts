import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaService } from './prisma/prisma.service';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend/dist'),
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    SeedModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
