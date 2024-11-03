// export class CreateCommentDto {}

import { Comments } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  id: number;

  @IsString()
  @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
  @MinLength(3)
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
  @MinLength(3)
  @MaxLength(2000)
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsEmail()
  email: string;
}
