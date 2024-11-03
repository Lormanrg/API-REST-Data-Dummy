import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsService } from 'src/posts/posts.service';
import { Comments } from '@prisma/client';
import { isUUID, IsUUID } from 'class-validator';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger('CommentsService');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostsService,
  ) {}

  async create(postId: number, createCommentDto: CreateCommentDto) {
    try {
      const createComment = await this.prismaService.comments.create({
        data: { ...createCommentDto, postId: postId },
      });

      return createComment;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const getAllComments = await this.prismaService.comments.findMany();
    return getAllComments;
  }

  async findCommentsByPost(postId: number) {
    const findingComments = await this.prismaService.comments.findMany({
      where: { postId }, // Filtra los comentarios por postId
    });

    return findingComments;
  }

  async findOne(id: number) {
    let commentById: Comments;
    if (isUUID(id)) {
      commentById = await this.prismaService.comments.findUnique({
        where: { id },
      });
    }

    if (!commentById) {
      throw new NotFoundException(`Comment with id:${id} not found`);
    }

    return commentById;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    await this.findOne(id);

    const updateComment = await this.prismaService.comments.update({
      where: { id },
      data: updateCommentDto,
    });
    return updateComment;
  }

  async remove(id: number) {
    await this.findOne(id);
    const deleteComment = await this.prismaService.comments.delete({
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
      throw new NotFoundException('The specified comment was not found.');
    }
    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
