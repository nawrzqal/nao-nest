import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRateDto {
  @IsNotEmpty()
  @IsNumber({  }, { message: 'Value must be a number' })
  @Min(1)
  @Max(5)
  value: number;

  @IsNotEmpty()
  @IsString()
  post: Types.ObjectId;
  
  @IsNotEmpty()
  @IsString()
  user: Types.ObjectId;
}
