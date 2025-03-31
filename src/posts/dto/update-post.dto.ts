import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { Types } from 'mongoose';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiPropertyOptional({ description: 'The updated title of the post' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'The updated content of the post' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'The updated image url of the post' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'The updated category of the post' })
  @IsOptional()
  @IsString()
  category?: string;
}