import ReserveInterface from "../../../src/modules/reserve/ReserveInterface"
import ReserveValidator from "../../../src/modules/reserve/ReserveValidator"
import { validReservationRequest, validUser, validFakeReservation } from "../../objectInstances";
import AuthController from "../../../src/utils/AuthController";
import Fakes from "../../Fakes";
import { Response } from "supertest";
import request from "supertest";
import {app} from "../../../src/app";

let DB = new Fakes.Database();
let reservation: any;
let reservationRequest : any;
beforeAll(async ()=>{
  await DB.setup();
  reservationRequest = validReservationRequest(DB.user!.id, DB.car!.id );
});

afterAll(async()=>{
  await DB.close();
});

describe('{{ReserveController}} test suite', () =>{

  beforeEach(()=>{
    reservation = {...reservationRequest};
  });

  describe('{ANY OF THE ROUTES}', ()=>{

    describe('> Responds with 500 when', () =>{
      it('The user jwt is malformed', async () => {
        const res1: Response = await request(app).get('/api/v1/reserve/').set('Authorization', 'Bearer 123')
        const res2: Response = await request(app).post('/api/v1/reserve/').set('Authorization', 'Bearer 123')
        const res3: Response = await request(app).put('/api/v1/reserve/').set('Authorization', 'Bearer 123')
        const res4: Response = await request(app).delete('/api/v1/reserve/').set('Authorization', 'Bearer 123')

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

        const res1: Response = await request(app).get('/api/v1/reserve/').set('Authorization', `Bearer ${token}`)
        const res2: Response = await request(app).post('/api/v1/reserve/').set('Authorization', `Bearer ${token}`)
        const res3: Response = await request(app).put('/api/v1/reserve/').set('Authorization', `Bearer ${token}`)
        const res4: Response = await request(app).delete('/api/v1/reserve/').set('Authorization', `Bearer ${token}`)

        expect(res1.statusCode).toEqual(403);
        expect(res2.statusCode).toEqual(403);
        expect(res3.statusCode).toEqual(403);
        expect(res4.statusCode).toEqual(403);
      });
      it('no jwt was given', async () => {
        const res1: Response = await request(app).get('/api/v1/reserve/')
        const res2: Response = await request(app).post('/api/v1/reserve/')
        const res3: Response = await request(app).put('/api/v1/reserve/')
        const res4: Response = await request(app).delete('/api/v1/reserve/')
        expect(res1.statusCode).toEqual(403);
        expect(res2.statusCode).toEqual(403);
        expect(res3.statusCode).toEqual(403);
        expect(res4.statusCode).toEqual(403);
      });
    })
  });

  describe('{POST} /api/v1/reserve', () => {
    describe('> Responds with 201 when', () =>{
      it('a valid request is sent', async ()=>{
        const res: Response = await request(app).post('/api/v1/reserve').send(reservation).set('Authorization', `Bearer ${DB.user!.jwt}`);
        
        expect(res.statusCode).toEqual(201);
        await DB.deleteReservation(reservation.start_date);
      });
    })
    describe('> Responds with 400 when', () =>{
      it('a valid request is sent, but the user is not qualified', async ()=>{ 
        const res: Response = await request(app).post('/api/v1/reserve').send(reservation).set('Authorization', `Bearer ${DB.userNotQualified!.jwt}`);
        
        expect(res.statusCode).toEqual(400);
      })

      it('a valid request is sent, but the car already has a reservation within the timeframe', async ()=>{ 
        reservation.start_date = DB.reservation!.start_date;
        reservation.end_date = DB.reservation!.end_date;
        const res: Response = await request(app).post('/api/v1/reserve').send(reservation).set('Authorization', `Bearer ${DB.user!.jwt}`);
        
        expect(res.statusCode).toEqual(400);
      })
      it('the start date is after the end date', async ()=>{
        const buffer = reservation.start_date;
        reservation.start_date = reservation.end_date;
        reservation.end_date = buffer;
        const res: Response = await request(app).post('/api/v1/reserve').send(reservation).set('Authorization', `Bearer ${DB.user!.jwt}`);
        
        expect(res.statusCode).toEqual(400);
      });
    });
    describe('> Responds with 404 when', () =>{
      it('no car is found with the given id', async ()=>{
        const {id} = await DB.addCar();
        reservation.id_car = id;
        await DB.deleteCar(id);

        const res: Response = await request(app).post('/api/v1/reserve').send(reservation).set('Authorization', `Bearer ${DB.user!.jwt}`);

        expect(res.statusCode).toEqual(404);
      });
    });
  });

  describe('{GET} /api/v1/reserve', () => {
    describe('> Responds with 200 when', () =>{
      it('a valid request is sent', async ()=>{
        const res: Response = await request(app).get('/api/v1/reserve/').set('Authorization', `Bearer ${DB.user!.jwt}`);
        expect(res.statusCode).toEqual(200);
      });
    });
  });

  describe('{DELETE} /api/v1/reserve/:id', () => {
    describe('> Responds with 204 when', () =>{
      it('a valid request is sent', async ()=>{
        const reservation = await DB.addReservation();

        const res: Response = await request(app).delete(`/api/v1/reserve/${reservation.id}`).set('Authorization', `Bearer ${DB.user!.jwt}`);
        expect(res.statusCode).toEqual(204);
      });
    });
    describe('> Responds with 404 when', () =>{
      it('the given id is not present in the database', async ()=>{
        const reservation = await DB.addReservation();
        await DB.deleteReservation(reservation.start_date);

        const res: Response = await request(app).delete(`/api/v1/reserve/${reservation.id}`).set('Authorization', `Bearer ${DB.user!.jwt}`);
        expect(res.statusCode).toEqual(404);
      });
    });
  });

  describe('{PUT} /api/v1/reserve/:id', () => {
    describe('> Responds with 200 when', () =>{
      
      describe('you update any of the valid fields', ()=>{

        let localreservation: any;
        beforeAll(async () =>{
          localreservation = await DB.addReservation();
        })
        
        it.each([
          {input:'start_date', value: "2022-10-21" },
          {input:'end_date', value: "2023-11-21" },
          {input:'id_user', value:  DB.userNotQualified},
        ])('- $input is updated',async ({input, value})=>{
          const data = {[input]: value}
          const res: Response = await request(app).put(`/api/v1/reserve/${localreservation.id}`).send(data).set('Authorization', `Bearer ${DB.user!.jwt}`);
          expect(res.statusCode).toEqual(200);
          
        });
        afterAll(async () =>{
          await  DB.deleteReservation(localreservation.start_date);
        })
        
      })
    });
    

  });
});
