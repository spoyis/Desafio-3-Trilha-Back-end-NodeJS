import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { Response } from "supertest";
import {app} from "../../../src/app";
import { UserRepository } from "../../../src/modules/user/UserRepository";
import { validUser } from "../objectInstances";

let mongod: MongoMemoryServer;
const repo = new UserRepository();

const connectDB  = async () =>{
  mongod = await MongoMemoryServer.create();
  const DB = mongod.getUri();

  console.log(DB)
  mongoose.connect(DB).then(() => console.log('LOCAL DB connection successful!'));
}

beforeAll(async () => {
    repo.create(validUser)
    await connectDB();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('UserController test suite', () => {

  describe('GET /api/v1/user', () => {
    it('responds with status 200', async () => 
    {
      const res: Response = await request(app).get('/api/v1/user');
      console.log(res.body);
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('GET /api/v1/user/:id', () => {

    describe('Respond with 400 when', () =>{
      it('There is a bad id in the params', async () => 
      {
        const badId = 123;
        const res: Response = await request(app).get(`/api/v1/user/${badId}`);

        expect(res.statusCode).toEqual(404);
      });
    })
  });


});