import { Schema, model } from 'mongoose';
import CarInterface from './CarInterface';

const carSchema = new Schema<CarInterface>({
  model:{
    type: String
  },
  color:{
    type: String,
  },
  year:{
    type: Number
  },
  value_per_day:{
    type: Number,
  },
  accessories: [String],
  number_of_passengers:{
    type: Number
  }
});

const CarModel = model('Car', carSchema);
export default CarModel