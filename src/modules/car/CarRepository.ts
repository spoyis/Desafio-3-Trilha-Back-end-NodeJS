import BaseRepository from '../../utils/BaseRepository';
import CarModel from './CarSchema';
import CarInterface from './CarInterface';

export class CarRepository extends BaseRepository<CarInterface>{
  constructor() {
    super(CarModel);
  }
}