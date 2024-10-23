import { Car } from 'src/cars/entities/car.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trademark: string;

  @OneToMany(() => Car, (car) => car.brand) //relacion  bidireccional
  cars: Car[];
}
