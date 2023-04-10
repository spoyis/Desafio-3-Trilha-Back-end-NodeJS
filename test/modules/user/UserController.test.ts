import request from "supertest";
import { Response } from "supertest";
import {app} from "../../../src/app";
import { validUserRequest, DatabaseUser, validUser } from "../../objectInstances";
import Fakes from "../../Fakes";
import AuthController from "../../../src/utils/AuthController";

let DB = new Fakes.Database();

beforeAll(async () => {
  await DB.setup();
});

afterAll(async () => {
  await DB.close();
});

describe('{{UserController}} test suite', () => {

  describe('{GET} /api/v1/user', () => {
    describe('> Responds with 200 when', () =>{
      it('an empty request is sent', async () => 
      {
        const res: Response = await request(app).get('/api/v1/user');
        
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

    describe('> Responds with 400 when', () =>{
    
      it('Some "palmeirense safado" tries querying for passwords', async ()=>{
        const query = {password: 'palmeirasnaotemmundial'};
        const res: Response = await request(app).get('/api/v1/user').query(query);
        expect(res.statusCode).toEqual(400);
      })
    })
  });


  describe('{GET} /api/v1/user/:id', () => {

    describe('> Responds with 200 when', () =>{
      it('There is a valid id in the params', async () => 
      {
        const res: Response = await request(app).get(`/api/v1/user/${DB.user!.id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({message: 'retrieved 1 user(s) at page 0'});
      });
    })

    describe('> Responds with 400 when', () =>{
      it('There is a bad id in the params', async () => 
      {
        const badId = 123;
        const res: Response = await request(app).get(`/api/v1/user/${badId}`);

        expect(res.statusCode).toEqual(404);
      });
    })
    
  });


  describe('{POST} /api/v1/user/', () => {
    let createdUser = false;

    describe('> Responds with 201 when', () =>{
      it('The request body has valid parameters', async () => {
        const res: Response = await request(app).post('/api/v1/user/').send(validUserRequest)
        expect(res.statusCode).toEqual(201);
        createdUser = true;
      });
    })

    describe('> Responds with 400 when', () =>{
      it('tries to sign up with an email/cpf that already exists within the database', async () => {
        const request1 = {...validUserRequest};
        const request2 = {...validUserRequest};

        request1.email = DatabaseUser.email
        request2.cpf = DatabaseUser.cpf;

        const res1: Response = await request(app).post('/api/v1/user/').send(request1)
        const res2: Response = await request(app).post('/api/v1/user/').send(request2)
        
        expect(res1.statusCode).toEqual(400);
        expect(res2.statusCode).toEqual(400);
      });  
    })

    afterEach(async()=>{
      if(createdUser)
        await DB.deleteUser(validUserRequest.cpf)
    })
  })


  describe('{POST} /api/v1/user/authenticate', () => {
  
    describe('> Responds with 201 when', () =>{
      it('The request body has valid parameters for a real user', async () => {
        const res: Response = await request(app).post('/api/v1/user/authenticate').send({email: DatabaseUser.email, password: DatabaseUser.password})
        expect(res.statusCode).toEqual(200);
      });
    })
    describe('> Responds with 400 when', () =>{
      it('The request body is missing one of the login parameters', async () => {
        const res: Response = await request(app).post('/api/v1/user/authenticate').send({email: DatabaseUser.email})
        expect(res.statusCode).toEqual(400);
      });
    })
    describe('> Responds with 404 when', () =>{
      it('The request body has valid parameters, but no user matches the email', async () => {
        const res: Response = await request(app).post('/api/v1/user/authenticate').send({email: 'ninguem@corinthians.com', password: '123'})
        expect(res.statusCode).toEqual(404);
      });
    })
    describe('> Responds with 401 when', () =>{
      it('The request body has valid parameters for a real user, but the password is wrong', async () => {
        const res: Response = await request(app).post('/api/v1/user/authenticate').send({email: DatabaseUser.email, password: '123'})
        expect(res.statusCode).toEqual(401);
      });
    })
  })

  
  describe('{DELETE} /api/v1/user/', () => {

    describe('> Responds with 204 when', () =>{
      it('The user is logged in with a valid JWT accesses the route', async () => {
        const user = await DB.addUser(validUser);
        const token = await AuthController.signToken(user.id)

        const res: Response = await request(app).delete('/api/v1/user/').set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(204);
      });
    })

    describe('> Responds with 500 when', () =>{
      it('The user jwt is malformed', async () => {
        const res: Response = await request(app).delete('/api/v1/user/').set('Authorization', 'Bearer 123')
        expect(res.statusCode).toEqual(500);
      });
    })

    describe('> Responds with 403 when', () =>{
      it('the given jwt doesnt match an existing users', async () => {
        const user = await DB.addUser(validUser);
        const token = await AuthController.signToken(user.id)
        
        const res1: Response = await request(app).delete('/api/v1/user/').set('Authorization', `Bearer ${token}`)
        const res2: Response = await request(app).delete('/api/v1/user/').set('Authorization', `Bearer ${token}`)
        expect(res2.statusCode).toEqual(403);
      });
      it('no jwt was given', async () => {
        const res: Response = await request(app).delete('/api/v1/user/')
        expect(res.statusCode).toEqual(403);
      });
    })
    
  });

  describe('{PUT} /api/v1/user/:id', () => {
    describe('> Responds with 200 when', () =>{
      describe('any of the valid fields are updated', ()=>{
        it.each([
          {input:'name', value: 'Renato Augusto'},
          {input:'cpf', value: '066.691.930-50'},
          {input:'email', value: 'carregatime@corinthians.com'},
          {input:'password', value: 'deusnato'},
          {input:'qualified', value: true},
          {input:'cep', value: '31842688'}
        ])('- $input is updated',async ({input, value})=>{
          const user = await DB.addUser(validUser);
          const token = await AuthController.signToken(user.id)

          const data = {[input]: value}
          const res: Response = await request(app).put('/api/v1/user/').send(data).set('Authorization', `Bearer ${token}`);
          if(res.statusCode === 400)
            console.log(res)
          
          await DB.deleteUser(data.cpf || validUser.cpf)
        })
      })
    });
  });
});