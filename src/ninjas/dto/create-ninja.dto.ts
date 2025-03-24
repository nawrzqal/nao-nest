import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, MinLength } from "class-validator";
export class CreateNinjaDto {

    @ApiProperty({description: 'The name of the ninja'})
    @MinLength(3)
    name : string;

    @ApiProperty({description: 'The weapon of the ninja'})
    @IsEnum(['stars','nunchucks'], {message: 'Use correct Weapon please' })
    weapon: 'stars' | 'nunchucks';
}
