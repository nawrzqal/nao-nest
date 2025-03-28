import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a great post!' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsNotEmpty()
  @IsMongoId()
  postId: string;

  /*
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsOptional()
  @IsMongoId()
  parentCommentId?: string;
  */
}