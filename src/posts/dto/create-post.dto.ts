
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @ApiProperty({description: 'The name of the user'})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({description: 'The content of the post'})
  @IsNotEmpty()
  @IsString()
  content: string;
  
  @ApiProperty({description: 'The image url of the post'})
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({description: 'The category of the post'})
  @IsNotEmpty()
  @IsString()
  category?: string;
  
}
