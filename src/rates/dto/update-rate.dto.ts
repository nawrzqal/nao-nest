import { PartialType } from "@nestjs/swagger";
import { CreateRateDto } from "./create-rate.dto";
import { IsNumber, Max, Min } from "class-validator";
import { IsOptional } from "class-validator";

export class UpdateRateDto extends PartialType(CreateRateDto) {

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    value?: number;
}
