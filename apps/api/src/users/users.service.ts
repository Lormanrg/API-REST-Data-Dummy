import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { throwError } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UserService');

  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createUser = await this.prismaService.user.create({
        data: createUserDto,
      });

      return createUser;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const findUsers = await this.prismaService.user.findMany();

    return findUsers;
  }

  async findOne(id: number) {
    const getUser = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!getUser) {
      throw new NotFoundException(`User with id:${id} not found`);
    }

    return getUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const deletedUser = await this.prismaService.user.delete({
      where: {
        id,
      },
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

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
