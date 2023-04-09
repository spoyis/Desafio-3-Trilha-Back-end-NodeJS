import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ObjectId } from "mongoose";
import { UserRepository } from "../../src/modules/user/UserRepository";
import { CarRepository } from "../../src/modules/car/CarRepository";
import { ReserveRepository } from "../../src/modules/reserve/ReserveRepository";
import { DatabaseUserQualified, DatabaseUserNotQualified } from "./objectInstances";
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
      await this.addUsers();
      return this;
    }

    public async close(){
      await mongoose.disconnect();
      await this.mongod!.stop();
    }

    private async addUsers(){
      const doc = await userRepo.create(DatabaseUserQualified);
      this.user = new UserData(doc.id, await AuthController.signToken(doc.id));
    
      await userRepo.create(DatabaseUserNotQualified);
    }

    constructor(){
      // NOTHING
    }
  }
  
}

export default Fakes;