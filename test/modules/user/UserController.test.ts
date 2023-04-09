import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ObjectId } from "mongoose";
import request from "supertest";
import { Response } from "supertest";
import {app} from "../../../src/app";
import { UserRepository } from "../../../src/modules/user/UserRepository";
import { validUser } from "../objectInstances";
import Fakes from "../Fakes";

let DB = new Fakes.Database();

beforeAll(async () => {
  await DB.setup();
});

afterAll(async () => {
  await DB.close();
});

describe('UserController test suite', () => {

  describe('GET /api/v1/user', () => {
    it('responds with status 200', async () => 
    {
      const res: Response = await request(app).get('/api/v1/user');
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
    describe('Respond with 200 when', () =>{
      it('There is a valid id in the params', async () => 
      {
        const res: Response = await request(app).get(`/api/v1/user/${DB.user!.id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({message: 'retrieved 1 user(s) at page 0'});
      });
    })

  });


});