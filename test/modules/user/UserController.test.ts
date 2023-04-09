import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { Response } from "supertest";
import {app} from "../../../src/app";

let mongod: MongoMemoryServer;

const connectDB  = async () =>{
  mongod = await MongoMemoryServer.create();
  const DB = mongod.getUri();

  console.log(DB)
  mongoose.connect(DB).then(() => console.log('LOCAL DB connection successful!'));
}

beforeAll(async () => {
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
        expect(res.statusCode).toEqual(200);
      });
    });
});