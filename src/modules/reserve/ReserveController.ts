import { Request, Response, NextFunction } from 'express';
import { ReserveRepository } from './ReserveRepository';
import { CarRepository } from '../car/CarRepository';
import CarInterface from '../car/CarInterface';
import ReserveInterface from './ReserveInterface';
import ErrorController from '../../errors/ErrorController';
import ReserveValidator from './ReserveValidator';
import { HydratedDocument, FilterQuery, QueryOptions } from 'mongoose';
import AppError from '../../errors/AppError';
import MakeResponse from '../../utils/MakeResponse';


const repo = new ReserveRepository();
const carRepo = new CarRepository();

namespace ReserveController{

  const PAGE_SIZE = 5;
  const NO_FILTER = {};
  const NO_OPTIONS = {};

  export const POST =  ErrorController.catchAsync( async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    const carQuery : FilterQuery<HydratedDocument<CarInterface>> = {_id: req.body.id_car}
    
    const car = await carRepo.findOne(carQuery, NO_OPTIONS);
    if(!car) return next(new AppError("No car found with given id.", 404));

    const ONE_DAY_MS = 1000 * 60 * 60 * 24;
    req.body.final_value = car!.value_per_day * Math.floor((new Date(req.body.end_date).valueOf() - new Date(req.body.start_date).valueOf()) / ONE_DAY_MS);

    req.body.id_user =  (req as any).user.id ;

    console.log(req.body)

    const reserve = await ReserveValidator.validatePOST(req.body);

    // TODO: DISALLOW A CAR TO BE RESERVED MORE THAN ONCE IN A GIVEN TIMESPAN
    // TODO: DISALLOW A USER TO RESERVE MORE THAN ONE CAR

    await repo.create(reserve);

    MakeResponse.success(res, 201, "Reservation succesfully registered." , reserve);
  });

  export const GET = async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    // TODO:
  }

  export const DELETE = ErrorController.catchAsync(async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  })

  export const UPDATE =  ErrorController.catchAsync( async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  });
}

export default ReserveController;