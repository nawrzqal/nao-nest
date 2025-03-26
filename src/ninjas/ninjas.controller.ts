import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { json } from 'stream/consumers';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { identity, NotFoundError } from 'rxjs';
import { BeltGuard } from 'src/belt/belt.guard';
import { Ninja } from './entities/ninja.schema';
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
    async getNinjas(@Query('weapon') weapon?: 'stars' | 'nunchucks') {
        return this.ninjaService.getNinjas(weapon);
    }

    // GET/ninjas/:id --> { ... }
    @ApiOkResponse({type: Ninja})
    @Get(':id')
    async getOneNinja(@Param('id') id: string) {
        try {
            return await this.ninjaService.getNinja(id);
        } catch {
            throw new NotFoundException();
        }
    }

    // POST/ninjas
    @ApiCreatedResponse({type: Ninja})
    @Post()
    // @UseGuards(BeltGuard)
    async createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjaService.createNinja(createNinjaDto);
    }

    // PUT/PATCH/ninjas/:id --> { ... }
    @Put(':id')
    async updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjaService.updateNinja(id, updateNinjaDto);
    }

    // DELETE/ninjas/:id
    @Delete(':id')
    async removeNinja(@Param('id') id: string) {
        try {
            return await this.ninjaService.removeNinja(id);
        } catch {
            throw new NotFoundException();
        }
    }
}