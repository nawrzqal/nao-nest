import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { Ninja } from './entities/ninja.schema';

@Injectable()
export class NinjasService {
    constructor(
        @InjectModel(Ninja.name) private ninjaModel: Model<Ninja>
    ) {}

    async getNinjas(weapon?: 'stars' | 'nunchucks') {
        const query = weapon ? { weapon } : {};
        return this.ninjaModel.find(query).exec();
    }

    async getNinja(id: string) {
        const ninja = await this.ninjaModel.findById(id).exec();
        if (!ninja) {
            throw new NotFoundException('Ninja not found');
        }
        return ninja;
    }

    async createNinja(createNinjaDto: CreateNinjaDto) {
        const newNinja = new this.ninjaModel(createNinjaDto);
        return newNinja.save();
    }

    async updateNinja(id: string, updateNinjaDto: UpdateNinjaDto) {
        const updatedNinja = await this.ninjaModel
            .findByIdAndUpdate(id, updateNinjaDto, { new: true })
            .exec();
            
        if (!updatedNinja) {
            throw new NotFoundException('Ninja not found');
        }
        return updatedNinja;
    }

    async removeNinja(id: string) {
        const deletedNinja = await this.ninjaModel.findByIdAndDelete(id).exec();
        if (!deletedNinja) {
            throw new NotFoundException('Ninja not found');
        }
        return deletedNinja;
    }
}
