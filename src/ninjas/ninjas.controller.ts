import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { json } from 'stream/consumers';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { identity, NotFoundError } from 'rxjs';

@Controller('ninjas')
export class NinjasController {
    // dependency Injection
    constructor(private readonly ninjaService: NinjasService) {}



    // GET/ninjas --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks' ) {
        // const service = new NinjasService();
        return this.ninjaService.getNinjas(weapon);
    }

    // GET/ninjas/:id --> { ... }
    @Get(':id')
    getOneNinja(@Param('id') id:string ){
        try{
            return this.ninjaService.getNinja(+id); // + because it comes as string in link and we need number
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
    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto){
        return this.ninjaService.createNinja(createNinjaDto);
    }

    // PUT/PATCH/ninjas/:id --> { ... }
    @Put(':id')
    uodateNinja(@Param('id') id:string, @Body() updateNinjaDto: UpdateNinjaDto ){
        return this.ninjaService.updateNinja(+id,updateNinjaDto);
    }

    // DELETE/ninjas/:id
    @Delete(':id')
    removeNinja(@Param('id') id:string){
        return this.ninjaService.removeNinja(+id);
    }
}

