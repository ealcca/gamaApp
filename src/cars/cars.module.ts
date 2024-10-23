import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/brands/entities/brand.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Brand])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
