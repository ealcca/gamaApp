import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepor: Repository<Car>,
  ) {}

  async findAllByModel(
    model: string,
    year?: number,
    color?: string,
  ): Promise<Car[]> {
    const whereCondition: any = { model };
    if (year !== undefined) {
      whereCondition.year = year;
    }
    if (color !== undefined) {
      whereCondition.color = color;
    }
    const modeloExiste = await this.carRepor.findOne({
      where: whereCondition,
    });
    if (!modeloExiste) {
      throw new NotFoundException('No tenemos auto de esa marca', 'NOT EXIST');
    }
    const carsModel = await this.carRepor.find({
      where: whereCondition,
    });
    return carsModel;
  }

  async findAllByModelAndColor(model: string, color?: string): Promise<Car[]> {
    const whereCondition: any = { model };
    if (color !== undefined) {
      whereCondition.color = color;
    }
    const modeloExiste = await this.carRepor.findOne({
      where: whereCondition,
    });
    if (!modeloExiste) {
      throw new NotFoundException('No tenemos auto de esa marca', 'NOT EXIST');
    }
    const carsModel = await this.carRepor.find({
      where: whereCondition,
    });
    return carsModel;
  }

  async findAll() {
    const cars = await this.carRepor.find({
      relations: ['brand'],
    });
    return cars;
  }

  async findOne(id: number) {
    const car = await this.carRepor.findOne({
      where: { id },
      relations: ['brand'],
    });
    if (!car) {
      throw new NotFoundException('El auto no existe', 'NOT EXIST');
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const updateCar = await this.findOne(id);
    await this.carRepor.update({ id }, updateCarDto);
    return updateCar;
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = await this.carRepor.save(createCarDto);
    return await this.findOne(newCar.id);
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    await this.carRepor.delete(id);
    return 'Auto ELIMINADO';
  }
}
