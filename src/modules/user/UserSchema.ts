import { Schema, model } from 'mongoose';
import UserInterface from './UserInterface';
import bcrypt from 'bcryptjs'
import addressSchema from './AddressSchema';

const userSchema = new Schema<UserInterface>({
  name:{
    type: String
  },
  cpf:{
    type: String
  },
  birthDate:{
    type: Date
  },
  email:{
    type: String
  },
  password:{
    type: String
  },
  address:{
    type: addressSchema
  },
  qualified:{
    type: Boolean
  }
});
