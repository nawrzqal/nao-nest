import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ 
    example: 'This is an updated comment!',
    required: false 
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ 
    example: true,
    required: false 
  })
  @IsOptional()
  @IsBoolean()
  isEdited?: boolean;
  /*
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011',
    required: false 
  })
  @IsOptional()
  @IsMongoId()
  parentCommentId?: string;
  */
}