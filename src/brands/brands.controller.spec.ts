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