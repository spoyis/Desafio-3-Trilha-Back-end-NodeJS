import { Schema, model } from 'mongoose';
import UserInterface from '../interfaces/UserInterface';
import bcrypt from 'bcryptjs'
import addressSchema from './Address';

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
