import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { NotFoundError } from 'rxjs';
import { error } from 'console';
import { promises } from 'dns';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepor: Repository<Brand>,
  ) {}

  async findAll(): Promise<Brand[]> {
    const brands = await this.brandRepor.find();
    return brands;
  }

  async findOne(id: number) {
    const brand = await this.brandRepor.findOne({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException('No existe la marca', 'NOT BRAND');
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const updateBrand = await this.findOne(id);
    await this.brandRepor.update({ id }, updateBrandDto);
    return updateBrand;
  }

  async create(createBrandDto: CreateBrandDto) {
    try {
      const newBrand = this.brandRepor.save(createBrandDto);
      return newBrand;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear la nueva marca',
        'CREATE ERROR',
      );
    }
  }

  handleConstrainError({ code }) {
    if (code === '23503') {
      const errorMsg = 'No se puede borrar se encuentra en uso';
      throw new HttpException(errorMsg, HttpStatus.CONFLICT);
    }
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    try {
      await this.brandRepor.delete(id);
      return 'MARCA ELIMINADA';
    } catch (error) {
      this.handleConstrainError(error);
    }
  }
}
