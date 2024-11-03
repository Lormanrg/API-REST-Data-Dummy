import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { retry } from 'rxjs';
import { isUUID } from 'class-validator';
import { Post } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  private readonly logger = new Logger('PostsService');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    try {
      const createPost = await this.prismaService.post.create({
        data: {
          ...createPostDto,
          userId,
        },
      });

      return {
        id: createPost.id,
        title: createPost.title,
        body: createPost.body,
        createdAt: createPost.createdAt,
      };
    } catch (error) {
      console.log(error);
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const getAllPosts = await this.prismaService.post.findMany();

    return getAllPosts;
  }

  async findOne(id: number) {
    let postById: Post;

    if (isUUID(id)) {
      postById = await this.prismaService.post.findUnique({
        where: {
          id,
        },
      });
    }

    if (!postById) {
      throw new NotFoundException(`Post with id:${id} not found`);
    }

    return postById;
  }

  async findPostsByUser(userId: number) {
    const findingPost = await this.prismaService.post.findMany({
      where: { userId },
    });

    return findingPost;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);

    const updatePost = await this.prismaService.post.update({
      where: { id },
      data: updatePostDto,
    });

    return {
      id: updatePost.id,
      title: updatePost.title,
      body: updatePost.body,
      updatePost: updatePost.updatedAt,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    const deletePost = await this.prismaService.post.delete({
      where: { id },
    });
  }

  private handleDBExceptions(error: any) {
    if (error.code === 'P2002' && error.meta && error.meta.target) {
      // Extrae el campo que causa el conflicto de unicidad
      const duplicatedField = error.meta.target[0];
      throw new BadRequestException(
        `The ${duplicatedField} is already in use.`,
      );
    }

    if (error.code === 'P2003') {
      // Esto maneja el caso cuando no se encuentra un registro relacionado, como un `userId` inexistente
      throw new NotFoundException('The specified user was not found.');
    }
    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
