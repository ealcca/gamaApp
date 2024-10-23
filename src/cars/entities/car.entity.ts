//import { Brand } from 'src/brands/entities/brand.entity';
import { Brand } from '../../brands/entities/brand.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  color: string;

  @Column()
  price: number;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brandId' })
  brand: number | Brand;
}
