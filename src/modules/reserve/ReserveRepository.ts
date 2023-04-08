import BaseRepository from '../../utils/BaseRepository';
import ReserveModel from './ReserveSchema';
import ReserveInterface from './ReserveInterface';

export class ReserveRepository extends BaseRepository<ReserveInterface>{
  constructor() {
    super(ReserveModel);
  }
}