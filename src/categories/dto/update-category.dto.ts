import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsArray } from 'class-validator';
import { IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({ example: ['665e0b59b541262488a5e0b5'] })
    @IsArray()
    @IsString({ each: true })
    posts?: string[];           
}
