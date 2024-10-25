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
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME, 
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
                trademark: 'tesla_TeST',
            }),
        ).toEqual({
            trademark: 'tesla_TeST',
            id: expect.any(Number),
        });
    });
});
