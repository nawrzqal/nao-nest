import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { Ninja } from './entities/ninja.entity';
@Injectable()
export class NinjasService {
    private ninjas: Ninja[] = [
        { id: 1, name: 'Naruto', weapon: 'stars' },
        { id: 2, name: 'Sasuke', weapon: 'nunchucks' },
    ];

    getNinjas(weapon: 'stars' | 'nunchucks'): Ninja[] {
        if (weapon) {
          return this.ninjas.filter(ninja => ninja.weapon === weapon);
        }
        return this.ninjas;
    }

    getNinja(id: number) : Ninja {
        const ninja = this.ninjas.find(ninja => ninja.id === id);
        if (!ninja) {
          throw new Error('Ninja not found');
        }
        return ninja;
    }

    createNinja(createNinjaDto: CreateNinjaDto): Ninja {
        const newNinja = {
          id: Date.now(),
          ...createNinjaDto,
        };
        this.ninjas.push(newNinja);
        return newNinja;
    }

    updateNinja(id: number, updateNinjaDto: UpdateNinjaDto): Ninja {
        this.ninjas = this.ninjas.map( (ninja)=>{
            if(ninja.id == id){
                return { ...ninja,...updateNinjaDto };
            }

            return ninja;
        })

        return this.getNinja(id);
    }

    removeNinja(id: number): Ninja {
        const toBeRemoved = this.getNinja(id);
        
        this.ninjas = this.ninjas.filter( (ninja)=> ninja.id !== id );

        return toBeRemoved;
    }
}
