import { Schema, model } from 'mongoose';
import AddressInterface from '../interfaces/AddressInterface';

const addressSchema = new Schema<AddressInterface>({
  cep:{
    type: Number
  },
  patio: {
    type: String
  },
  complement:{
    type: String    
  },
  neighborhood:{
    type: String
  },
  locality:{
    type: String
  },
  uf:{
    type: String
  }
});

export default addressSchema;