import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { QueryCarsDto } from './dto/query-cars.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { query } from 'express';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async findAll(
    @Query('model') model: string,
    @Query('year') year?: number,
    @Query('color') color?: string,
  ) {
    if (model) {
      if (year && color) {
        return this.carsService.findAllByModel(model, year, color);
      } else if (year) {
        return this.carsService.findAllByModel(model, year);
      } else if (color) {
        return this.carsService.findAllByModelAndColor(model, color);
      } else {
        return this.carsService.findAllByModel(model);
      }
    } else {
      return this.carsService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Post('')
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carsService.create(createCarDto);
    return newCar;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
