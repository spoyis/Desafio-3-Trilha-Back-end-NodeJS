import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { UserRepository } from "../../src/modules/user/UserRepository";
import { CarRepository } from "../../src/modules/car/CarRepository";
import { ReserveRepository } from "../../src/modules/reserve/ReserveRepository";
import { DatabaseUserQualified, DatabaseUserNotQualified, DatabaseCar, validDBReservation, validFakeReservation } from "./objectInstances";
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
    public userNotQualified : UserData | undefined;
    public car : HydratedDocument<CarInterface> | undefined;
    public reservation : HydratedDocument<ReserveInterface> | undefined;

    public async setup(){
      this.mongod = await MongoMemoryServer.create();
      const DB = this.mongod.getUri();

      mongoose.connect(DB);
      await this.addUsers();
      await this.addDBCar();
      await this.addDBReservation();
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

      const doc2 = await userRepo.create(DatabaseUserNotQualified);
      const token2 = await AuthController.signToken(doc2._id);
      this.userNotQualified = new UserData(doc2.id, token2);
    }

    private async addDBCar(){
      const car = await carRepo.create(DatabaseCar);
      this.car = car;
    }

    public async addCar(){
      const car = await carRepo.create(DatabaseCar);
      return car;
    }

    private async addDBReservation(){
      const dbReservation = validDBReservation(this.user!.id, this.car);
      const reservation = await reserveRepo.create(dbReservation as any);
      this.reservation = reservation;
    }

    public async addReservation(){
      let dbReservation = validFakeReservation(this.user!.id, this.car);
      const reservation = await reserveRepo.create(dbReservation as any);

      return reservation;
    }

    public async deleteCar(carId : ObjectId){
      await carRepo.delete({_id : carId});
    }

    public async deleteUser(usercpf : any){
      await userRepo.delete({cpf : usercpf});
    }

    public async deleteReservation(start_date : any){
      await reserveRepo.delete({start_date});
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