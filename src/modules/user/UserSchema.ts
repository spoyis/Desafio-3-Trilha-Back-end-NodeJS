import { Schema, model } from 'mongoose';
import UserInterface from './UserInterface';
import bcrypt from 'bcryptjs'
import addressSchema from './AddressSchema';

const userSchema = new Schema<UserInterface>({
  name:{
    type: String
  },
  cpf:{
    type: String,
    unique: true
  },
  birthDate:{
    type: Date
  },
  email:{
    type: String,
    unique: true
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

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
	
  next();
});

const UserModel = model('User', userSchema);
export default UserModel