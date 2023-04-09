import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { UserRepository } from "../../src/modules/user/UserRepository";
import { CarRepository } from "../../src/modules/car/CarRepository";
import { ReserveRepository } from "../../src/modules/reserve/ReserveRepository";
import { DatabaseUserQualified, DatabaseUserNotQualified, DatabaseCar, validDBReservation } from "./objectInstances";
import AuthController from "../../src/utils/AuthController";
import UserInterface from "../../src/modules/user/UserInterface";
import CarInterface from "../../src/modules/car/CarInterface";
import ReserveInterface from "../../src/modules/reserve/ReserveInterface";

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
    public car : HydratedDocument<CarInterface> | undefined;
    public reservation : HydratedDocument<ReserveInterface> | undefined;

    public async setup(){
      this.mongod = await MongoMemoryServer.create();
      const DB = this.mongod.getUri();

      mongoose.connect(DB);
      await this.addUsers();
      await this.addCar();
      await this.addReservation();
      return this;
    }

    public async close(){
      await mongoose.disconnect();
      await this.mongod!.stop();
    }

    private async addUsers(){
      const doc = await userRepo.create(DatabaseUserQualified);
      const token = await AuthController.signToken(doc._id);
      this.user = new UserData(doc.id, token);
      console.log(this.user)

      await userRepo.create(DatabaseUserNotQualified);
    }

    private async addCar(){
      const car = await carRepo.create(DatabaseCar);
      this.car = car;
    }

    private async addReservation(){
      console.log('ADDDING RESERVATION\n' + this.car)
      const dbReservation = validDBReservation(this.user!.id, this.car);
      const reservation = await reserveRepo.create(dbReservation as any);
    }

    public async deleteUser(usercpf : ObjectId){
      await userRepo.delete({cpf : usercpf});
    }

    public async addUser(user: UserInterface){
      return await userRepo.create(user);
    }

    constructor(){
      // NOTHING
    }
  }
  
}

export default Fakes;