import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Technology' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'All about tech news and updates' })
  @IsNotEmpty()
  @IsString()
  description: string;
  
}
