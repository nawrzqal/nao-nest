import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import { NinjaSchema } from './entities/ninja.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Ninja } from './entities/ninja.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ninja.name, schema: NinjaSchema }])],
  controllers: [NinjasController],
  providers: [NinjasService]
})
export class NinjasModule {}
