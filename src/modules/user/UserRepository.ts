import BaseRepository from '../../utils/BaseRepository';
import UserModel from './UserSchema';
import { Model } from 'mongoose';
import UserInterface from './UserInterface';

export class UserRepository extends BaseRepository<UserInterface>{
  constructor() {
    super(UserModel);
  }
}