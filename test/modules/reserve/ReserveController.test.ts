import ReserveInterface from "../../../src/modules/reserve/ReserveInterface"
import ReserveValidator from "../../../src/modules/reserve/ReserveValidator"
import { validReservationRequest } from "../objectInstances";
import Fakes from "../Fakes";
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


  describe('{POST} /api/v1/reserve', () => {
    describe('> Responds with 201 when', () =>{
      it('Should return the user object, if the given inputs are valid', async ()=>{
        const res: Response = await request(app).post('/api/v1/reserve').send(reservation).set('Authorization', `Bearer ${DB.user!.jwt}`);
        
        expect(res.statusCode).toEqual(201);
      });
    })
  });

  
});
