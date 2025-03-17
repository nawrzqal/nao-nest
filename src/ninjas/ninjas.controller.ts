import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { json } from 'stream/consumers';

@Controller('ninjas')
export class NinjasController {
    // GET/ninjas --> []
    // للحصول على قائمة النينجا.
    @Get()
    getNinjas(@Query('type')  type:string ){
        return [{
            type
        }];
    }
    // GET/ninjas/:id --> { ... }
    // للحصول على نينجا معين باستخدام ID.
    @Get(':id')
    getOneNinja(@Param('id') id:string ){
        return {
            id
        };
    }
    // POST/ninjas
    // لإنشاء نينجا جديد.
    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto){
        return {
            name: createNinjaDto.name
        };
    }
    // PUT/PATCH/ninjas/:id --> { ... }
    // لتحديث معلومات نينجا معين.
    @Put(':id')
    uodateNinja(@Param('id') id:string, @Body() createNinjaDto: CreateNinjaDto ){
        return {
            name : createNinjaDto.name
        };
    }
    // DELETE/ninjas/:id
    // لحذف نينجا معين.
    @Delete(':id')
    removeNinja(){
        return {};
    }
}
