import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ObjectId } from "mongoose";
import { UserRepository } from "../../src/modules/user/UserRepository";
import { CarRepository } from "../../src/modules/car/CarRepository";
import { ReserveRepository } from "../../src/modules/reserve/ReserveRepository";
import { validUser } from "./objectInstances";
import AuthController from "../../src/utils/AuthController";

namespace Fakes{

  const userRepo = new UserRepository();
  const carRepo = new CarRepository();
  const reserveRepo = new ReserveRepository();

  class UserData{
    public id: ObjectId 
    public jwt: string

    constructor(id: ObjectId, jwt : string){
      this.id = id;
      this.jwt = jwt;
    }
  }

  export class Database{

    private mongod: MongoMemoryServer | undefined;
    public user : UserData | undefined;

    public async setup(){
      this.mongod = await MongoMemoryServer.create();
      const DB = this.mongod.getUri();

      mongoose.connect(DB);
      this.addUser();
      return this;
    }

    public async close(){
      await mongoose.disconnect();
      await this.mongod!.stop();
    }

    private async addUser(){
      const doc = await userRepo.create(validUser);
      this.user = new UserData(doc.id, await AuthController.signToken(doc.id));
    }

    constructor(){
      // NOTHING
    }
  }
  
}

export default Fakes;