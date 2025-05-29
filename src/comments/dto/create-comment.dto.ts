import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a great post!' })
  @IsNotEmpty()
  @IsString()
  content: string;
}