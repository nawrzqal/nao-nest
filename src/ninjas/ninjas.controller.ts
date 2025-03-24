import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { json } from 'stream/consumers';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { identity, NotFoundError } from 'rxjs';
import { BeltGuard } from 'src/belt/belt.guard';
import { Ninja } from './entities/ninja.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ninjas')
@Controller('ninjas')
// @UseGuards(BeltGuard)
export class NinjasController {
    // dependency Injection
    constructor(private readonly ninjaService: NinjasService) {}



    // GET/ninjas --> []
    @ApiOkResponse({type: Ninja, isArray: true})
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks' ) : Ninja[] {
        // const service = new NinjasService();
        return this.ninjaService.getNinjas(weapon);
    }

    // GET/ninjas/:id --> { ... }
    @ApiOkResponse({type: Ninja})
    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id:number ): Ninja {
        try{
            return this.ninjaService.getNinja(id); // no need for +id after using pipe
        }catch{
            throw new NotFoundException();
            // customize
            // throw new NotFoundException('Ninja not found');

            /* 
                you can write a custom exception filter
                for more : https://docs.nestjs.com/exception-filters
            */
        }
    }

    // POST/ninjas
    @ApiCreatedResponse({type: Ninja})
    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body( new ValidationPipe() ) createNinjaDto: CreateNinjaDto): Ninja {
        return this.ninjaService.createNinja(createNinjaDto);
    }

    // PUT/PATCH/ninjas/:id --> { ... }
    @Put(':id')
    uodateNinja(@Param('id', ParseIntPipe) id:number, @Body() updateNinjaDto: UpdateNinjaDto ): Ninja {
        return this.ninjaService.updateNinja(id,updateNinjaDto);
    }

    // DELETE/ninjas/:id
    @Delete(':id')
    removeNinja(@Param('id', ParseIntPipe) id:number ): Ninja {
        try{
            return this.ninjaService.removeNinja(id);
        }catch {
            throw new NotFoundException();
        }
        
    }
}

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // تحويل أو التحقق من البيانات هنا
    return value;
  }
}
