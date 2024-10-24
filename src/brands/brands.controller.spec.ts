import {Test,TestingModule} from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Car } from '../cars/entities/car.entity';
dotenv.config();

describe('BrandsController', () => {
    let controller: BrandsController;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [BrandsController],
        providers: [BrandsService],
        imports: [
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: `${process.env.DB_NAME}_test`, 
            entities: [Car, Brand],
            synchronize: true,
          }),
          TypeOrmModule.forFeature([Brand]),
        ],
      }).compile();
  
      controller = module.get<BrandsController>(BrandsController);
    });
  
     
    it('should create a brand and return it with its id', async () => {
        expect(
            await controller.create({
                trademark: 'tesla',
            }),
        ).toEqual({
            trademark: 'tesla',
            id: expect.any(Number),
        });
    });
  
  });
  
/* con este no tenia problemas pero entiendo que es por tratarse de un mock

import {Test,TestingModule} from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';

describe('BrandsController',() => {
    let controller:BrandsController;
    let service:BrandsService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BrandsController],
            providers:[
                {
                    provide: BrandsService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([
                            {id:1, trademark:'tesla'},
                            {id:2, trademark:'ford'},
                        ]),
                    },
                },
            ],
        }).compile();

        controller = module.get<BrandsController>(BrandsController);
        service = module.get<BrandsService>(BrandsService);
    });

    it('should return an array of brans', async () => {
        const result = await controller.findAll();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(2);
        expect(result[0]).toHaveProperty('trademark','tesla');
    });
});
*/
