import { Schema, model } from 'mongoose';
import ReserveInterface from './ReserveInterface';
import { number } from 'joi';

export  interface asd{
  start_date: Date,
  end_date: Date,
  id_car: Schema.Types.ObjectId,
  id_user: Schema.Types.ObjectId,
  final_value: number
}

const reserveSchema = new Schema<ReserveInterface>({

  start_date:{
    type: Date
  },
  end_date:{
    type: Date
  },
  id_car:{
    type: Schema.Types.ObjectId,
    ref: 'Car'
  },
  id_user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  final_value:{
    type: Number
  }
})

const ReserveModel = model('Reserve', reserveSchema);
export default ReserveModel;