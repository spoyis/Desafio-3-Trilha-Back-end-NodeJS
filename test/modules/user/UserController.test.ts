import request from "supertest";
import { Response } from "supertest";
import {app} from "../../../src/app";
import { validUserRequest, DatabaseUser } from "../objectInstances";
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
    describe('Responds with 200 when', () =>{
      it('an empty request is sent', async () => 
      {
        const res: Response = await request(app).get('/api/v1/user');
        console.log(res.body)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({message: 'retrieved 2 user(s) at page 0'});
      });
      describe('Any of the valid query strings are sent', () =>{
        it.each([
          {input:'name', value: DatabaseUser.name},
          {input:'cpf', value: DatabaseUser.cpf},
          {input:'birthDate', value: DatabaseUser.birthDate},
          {input:'email', value: DatabaseUser.email},
          {input:'qualified', value: DatabaseUser.qualified}
        ])(' - $input is queried',  async ({input, value})=>{
          const query = {[input]: value}
          const res: Response = await request(app).get('/api/v1/user').query(query);
          expect(res.statusCode).toEqual(200);
          expect(res.body).toMatchObject({message: 'retrieved 1 user(s) at page 0'});
        });
      })
    })

    describe('Respond with 400 when', () =>{
    
      it('Some "palmeirense safado" tries querying for passwords', async ()=>{
        const query = {password: 'palmeirasnaotemmundial'};
        const res: Response = await request(app).get('/api/v1/user').query(query);
        expect(res.statusCode).toEqual(400);
      })
    })
  });

  describe('GET /api/v1/user/:id', () => {

    describe('Responds with 400 when', () =>{
      it('There is a bad id in the params', async () => 
      {
        const badId = 123;
        const res: Response = await request(app).get(`/api/v1/user/${badId}`);

        expect(res.statusCode).toEqual(404);
      });
    })
    describe('Responds with 200 when', () =>{
      it('There is a valid id in the params', async () => 
      {
        const res: Response = await request(app).get(`/api/v1/user/${DB.user!.id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({message: 'retrieved 1 user(s) at page 0'});
      });
    })

    

  });


});