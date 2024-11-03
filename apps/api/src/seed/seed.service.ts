import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import {
  JSONPlaceHolderUsers,
  JSONPlaceHolderPosts,
  JSONPlaceHolderComments,
} from './interfaces/index';

@Injectable()
export class SeedService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpAxiosAdapter: AxiosAdapter,
  ) {}

  async executedSeedUsers() {
    await this.prismaService.user.deleteMany({});

    const data = await this.httpAxiosAdapter.get<JSONPlaceHolderUsers[]>(
      'https://jsonplaceholder.typicode.com/users',
    );

    const createdUsers = await Promise.all(
      data.map(async (user) => {
        try {
          const createdUser = await this.prismaService.user.create({
            data: {
              id: Number(user.id),
              name: user.name,
              username: user.username,
              address: user.address.city,
              email: user.email,
              phone: user.phone,
              website: user.website,
              company: user.company.name,
            },
          });

          return createdUser;
        } catch (error) {
          console.log(error);
        }
      }),
    );
    return 'Seed User Executed';
  }

  async executedSeedPosts() {
    await this.prismaService.post.deleteMany({});

    const data = await this.httpAxiosAdapter.get<JSONPlaceHolderPosts[]>(
      'https://jsonplaceholder.typicode.com/posts',
    );

    const createdPosts = await Promise.all(
      data.map(async (post) => {
        try {
          const createdPost = await this.prismaService.post.create({
            data: {
              id: post.id,
              title: post.title,
              body: post.body,
              userId: post.userId,
            },
          });

          return createdPost;
        } catch (error) {
          console.log(error);
        }
      }),
    );
    return 'Seed Post Executed';
  }

  async executedSeedComments() {
    await this.prismaService.comments.deleteMany({});

    const data = await this.httpAxiosAdapter.get<JSONPlaceHolderComments[]>(
      'https://jsonplaceholder.typicode.com/comments',
    );

    const createdComments = await Promise.all(
      data.map(async (comment) => {
        try {
          const createdComment = await this.prismaService.comments.create({
            data: {
              id: comment.id,
              name: comment.name,
              body: comment.body,
              email: comment.email,
              postId: comment.postId,
            },
          });

          return createdComment;
        } catch (error) {
          console.log(error);
        }
      }),
    );
    return 'Seed Comment Executed';
  }
}
