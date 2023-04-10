import request from "supertest";
import { Response } from "supertest";
import {app} from "../../../src/app";
import { validCar, DatabaseCar, validUser } from "../../objectInstances";
import Fakes from "../../Fakes";
import AuthController from "../../../src/utils/AuthController";

let DB = new Fakes.Database();

beforeAll(async () => {
  await DB.setup();
});

afterAll(async () => {
  await DB.close();
});

describe('{{CarController}} test suite', () => {
  describe('{ANY OF THE ROUTES}', ()=>{
    describe('> Responds with 500 when', () =>{
      it('The user jwt is malformed', async () => {
        const res1: Response = await request(app).get('/api/v1/car/').set('Authorization', 'Bearer 123')
        const res2: Response = await request(app).post('/api/v1/car/').set('Authorization', 'Bearer 123')
        const res3: Response = await request(app).put('/api/v1/car/').set('Authorization', 'Bearer 123')
        const res4: Response = await request(app).delete('/api/v1/car/').set('Authorization', 'Bearer 123')

        expect(res1.statusCode).toEqual(500);
        expect(res2.statusCode).toEqual(500);
        expect(res3.statusCode).toEqual(500);
        expect(res4.statusCode).toEqual(500);
      });
    })
    describe('> Responds with 403 when', () =>{
      it('the given jwt doesnt match an existing users', async () => {
        const user = await DB.addUser(validUser);
        const token = await AuthController.signToken(user.id)
        await request(app).delete('/api/v1/user/').set('Authorization', `Bearer ${token}`)

        const res1: Response = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`)
        const res2: Response = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`)
        const res3: Response = await request(app).put('/api/v1/car/123').set('Authorization', `Bearer ${token}`)
        const res4: Response = await request(app).delete('/api/v1/car/123').set('Authorization', `Bearer ${token}`)

        expect(res1.statusCode).toEqual(403);
        expect(res2.statusCode).toEqual(403);
        expect(res3.statusCode).toEqual(403);
        expect(res4.statusCode).toEqual(403);
      });
      it('no jwt was given', async () => {
        const res1: Response = await request(app).get('/api/v1/reserve/')
        const res2: Response = await request(app).post('/api/v1/reserve/')
        const res3: Response = await request(app).put('/api/v1/reserve/123')
        const res4: Response = await request(app).delete('/api/v1/reserve/123')
        expect(res1.statusCode).toEqual(403);
        expect(res2.statusCode).toEqual(403);
        expect(res3.statusCode).toEqual(403);
        expect(res4.statusCode).toEqual(403);
      });
    })
  });

  describe('{GET} /api/v1/car', () => {
    describe('> Responds with 200 when', () =>{
      it('an empty request is sent', async () => 
      {
        const res: Response = await request(app).get('/api/v1/car').set('Authorization', `Bearer ${DB.user!.jwt}`);;
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({message: 'retrieved 1 car(s) at page 0'});
      });
      describe('Any of the valid query strings are sent', () =>{
        it.each([
          {input:'value_per_day', value: DatabaseCar.value_per_day},
          {input:'year', value: DatabaseCar.year},
          {input:'number_of_passengers', value: DatabaseCar.number_of_passengers},
          {input:'accessories', value: DatabaseCar.accessories[0].description},
          {input:'model', value: DatabaseCar.model}
        ])(' - $input is queried',  async ({input, value})=>{
          const query = {[input]: value}
          const res: Response = await request(app).get('/api/v1/car').query(query).set('Authorization', `Bearer ${DB.user!.jwt}`);;
          expect(res.statusCode).toEqual(200);
          expect(res.body).toMatchObject({message: 'retrieved 1 car(s) at page 0'});
        });
      })
    })
  });


  describe('{GET} /api/v1/car/:id', () => {

    describe('> Responds with 200 when', () =>{
      it('There is a valid id in the params', async () => 
      {
        const res: Response = await request(app).get(`/api/v1/car/${DB.car!.id}`).set('Authorization', `Bearer ${DB.user!.jwt}`);;

        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({message: 'retrieved 1 car(s) at page 0'});
      });
    })

    describe('> Responds with 400 when', () =>{
      it('There is a bad id in the params', async () => 
      {
        const badId = 123;
        const res: Response = await request(app).get(`/api/v1/car/${badId}`).set('Authorization', `Bearer ${DB.user!.jwt}`);;

        expect(res.statusCode).toEqual(404);
      });
    })
    
  });


  describe('{POST} /api/v1/car/', () => {
    let createdCar = false;

    describe('> Responds with 201 when', () =>{
      it('The request body has valid parameters', async () => {
        const res: Response = await request(app).post('/api/v1/car/').send(validCar).set('Authorization', `Bearer ${DB.user!.jwt}`);
        expect(res.statusCode).toEqual(201);
        createdCar = true;
      });
    })
  })
  

  describe('{DELETE} /api/v1/car/:id', () => {
    describe('> Responds with 204 when', () =>{
      it('The given id pertains to a valid car in the database', async () => {
        const car = await DB.addCar();
        
        const res: Response = await request(app).delete(`/api/v1/car/${car._id}`).set('Authorization', `Bearer ${DB.user!.jwt}`)
        
        expect(res.statusCode).toEqual(204);
      });
    })

    describe('> Responds with 404 when', () =>{
      it('The given id DOES NOT pertain to a valid car in the database', async () => {
        const car = await DB.addCar();
        
        const res1: Response = await request(app).delete(`/api/v1/car/${car._id}`).set('Authorization', `Bearer ${DB.user!.jwt}`)
        const res2: Response = await request(app).delete(`/api/v1/car/${car._id}`).set('Authorization', `Bearer ${DB.user!.jwt}`)

        expect(res2.statusCode).toEqual(404);
      });
    })
  })


  describe('{PUT} /api/v1/car/:id', () => {
    describe('> Responds with 200 when', () =>{
      describe('any of the valid fields are updated', ()=>{

        let localcar: any;
        beforeAll(async () =>{
          localcar = await DB.addCar();
        })
        
        it.each([
          {input:'value_per_day', value: validCar.value_per_day},
          {input:'year', value: validCar.year},
          {input:'number_of_passengers', value: validCar.number_of_passengers},
          {input:'accessories', value: validCar.accessories},
          {input:'model', value: validCar.model}
        ])('- $input is updated',async ({input, value})=>{
          const data = {[input]: value}
          const res: Response = await request(app).put(`/api/v1/car/${localcar.id}`).send(data).set('Authorization', `Bearer ${DB.user!.jwt}`);
          expect(res.statusCode).toEqual(200);
          
        });
        afterAll(async () =>{
          await  DB.deleteCar(localcar.id)
        })
      })
    });
    describe('> Responds with 404 when', () =>{
      it('The given id DOES NOT pertain to a valid car in the database', async () => {
        const localcar = await DB.addCar();
        
        const res1: Response = await request(app).delete(`/api/v1/car/${localcar._id}`).set('Authorization', `Bearer ${DB.user!.jwt}`)
        const res2: Response = await request(app).put(`/api/v1/car/${localcar._id}`).set('Authorization', `Bearer ${DB.user!.jwt}`)

        expect(res2.statusCode).toEqual(404);
      });
    })
  });


  describe('{PATCH} /api/v1/car/:id/accessories/:id', () => {
    describe('> Responds with 200 when', () =>{
      it('a valid description is given, and is not yet present in the db', async () => {
        const accessory = {description: 'a very neat and useful accessory'};
        const res: Response = await request(app).patch(`/api/v1/car/${DB.car!._id}/accessories/${DB.car!._id}`).set('Authorization', `Bearer ${DB.user!.jwt}`).send(accessory);

        expect(res.statusCode).toEqual(200);
      });

      it('a valid description is given, and is already present in the db', async () => {
        const accessory = {description: 'a very neat and useful accessory'};
        const res: Response = await request(app).patch(`/api/v1/car/${DB.car!._id}/accessories/${DB.car!._id}`).set('Authorization', `Bearer ${DB.user!.jwt}`).send((DB as any).car!.accessories[0]._doc);
        
        expect(res.statusCode).toEqual(200);
      });
    });
    describe('> Responds with 400 when', () =>{
      it('an invalid description is given ', async () => {
        const accessory = {description: 123};
        const res: Response = await request(app).patch(`/api/v1/car/${DB.car!._id}/accessories/${DB.car!._id}`).set('Authorization', `Bearer ${DB.user!.jwt}`).send(accessory);

        expect(res.statusCode).toEqual(400);
      });
    })
  });

});