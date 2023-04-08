import { Request, Response, NextFunction, query } from 'express';
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

  function calculateTotalCost (value_per_day : number, start_date: Date, end_date: Date): number {
    const ONE_DAY_MS = 1000 * 60 * 60 * 24;
    return value_per_day * Math.ceil((end_date.valueOf() - start_date.valueOf()) / ONE_DAY_MS);
  }

  export const POST =  ErrorController.catchAsync( async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    const carQuery : FilterQuery<HydratedDocument<CarInterface>> = {_id: req.body.id_car}
    
    const car = await carRepo.findOne(carQuery, NO_OPTIONS);
    if(!car) return next(new AppError("No object found with given id.", 404));

    req.body.final_value = calculateTotalCost(car!.value_per_day, new Date(req.body.start_date), new Date(req.body.end_date));

    req.body.id_user =  (req as any).user.id ;

    console.log(req.body)

    const reserve = await ReserveValidator.validatePOST(req.body);

    // TODO: DISALLOW A CAR TO BE RESERVED MORE THAN ONCE IN A GIVEN TIMESPAN
    // TODO: DISALLOW A USER TO RESERVE MORE THAN ONE CAR

    await repo.create(reserve);

    MakeResponse.success(res, 201, "Reservation succesfully registered." , reserve);
  });

  export const GET = async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    let queryOptions: QueryOptions<HydratedDocument<ReserveInterface>> = {"limit": PAGE_SIZE};
    const queryFilter : FilterQuery<HydratedDocument<ReserveInterface>> = req.params.id ? {"_id" : req.params.id, ...req.query} :  {...req.query}

    const pageIndex = +req.body.pageIndex || 0;
    queryOptions.skip = pageIndex * PAGE_SIZE;

    let reservations = await repo.find(queryFilter, queryOptions);

    MakeResponse.success(res, 200, `retrieved ${reservations.length} reservation(s) at page ${pageIndex}`, reservations);
  }

  export const DELETE = ErrorController.catchAsync(async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    let deleteParams: FilterQuery<HydratedDocument<ReserveInterface>>  = {_id : req.params.id};
    
    await repo.delete(deleteParams);
    MakeResponse.success(res, 204, "Reservation successfully deleted");
  })

  export const UPDATE =  ErrorController.catchAsync( async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    let updateParams: FilterQuery<HydratedDocument<ReserveInterface>>  = {_id : req.params.id};
    let queryOptions: QueryOptions<HydratedDocument<ReserveInterface>> = {populate: {path: "id_car"}};

    const reservation = await repo.findOne(updateParams, queryOptions);
    if(!reservation) return next(new AppError("No object found with given id.", 404));

    if(req.body.start_date || req.body.end_date){
      req.body.start_date = req.body.start_date || reservation.start_date;
      req.body.end_date = req.body.end_date || reservation.end_date;

      req.body.final_value = calculateTotalCost((reservation as any).id_car.value_per_day, new Date(req.body.start_date), new Date(req.body.end_date));
    }

    console.log(req.body)
    
    await ReserveValidator.validateUPDATE(req.body);
    await repo.update(req.params.id, req.body );
    // TODO: DISALLOW UPDATES IF THE GIVEN CAR ALREADY HAS A RESERVATION BOOKED WHICH INTERSECTS THE NEW TIMEFRAME

    MakeResponse.success(res, 200, "Reservation successfully updated");
  });
}

export default ReserveController;