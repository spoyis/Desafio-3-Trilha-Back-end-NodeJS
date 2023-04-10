import { Request, Response, NextFunction } from 'express';
import { CarRepository } from './CarRepository';
import CarValidator from './CarValidator';
import CarInterface from './CarInterface';
import MakeResponse from '../../utils/MakeResponse';
import ErrorController from '../../errors/ErrorController';
import AppError from '../../errors/AppError';
import { HydratedDocument, FilterQuery, QueryOptions } from 'mongoose';

const repo = new CarRepository();

namespace CarController{

  const PAGE_SIZE = 5;
  const NO_FILTER = {};
  const NO_OPTIONS = {};

  export const GET = ErrorController.catchAsync(async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    let queryOptions: QueryOptions<HydratedDocument<CarInterface>> = {"limit": PAGE_SIZE};
    const queryFilter : FilterQuery<HydratedDocument<CarInterface>> = req.params.id ? {"_id" : req.params.id, ...req.query} :  { ...req.query}

    if(queryFilter.accessories)
      queryFilter.accessories =  {$elemMatch: {description: queryFilter.accessories}};

    const pageIndex = +req.body.pageIndex || 0;
    queryOptions.skip = pageIndex * PAGE_SIZE;

    let cars = await repo.find(queryFilter, queryOptions);

    MakeResponse.success(res, 200, `retrieved ${cars.length} car(s) at page ${pageIndex}`, cars);
  });

  export const POST =  ErrorController.catchAsync( async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    const car = await CarValidator.validatePOST(req.body);

    await repo.create(car);

    MakeResponse.success(res, 201, "Car succesfully registered" , car);
  });

  export const DELETE = ErrorController.catchAsync(async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    let deleteParams: FilterQuery<HydratedDocument<CarInterface>>  = {_id : req.params.id};
    
    const result = await repo.delete(deleteParams);
    if(result.deletedCount === 0) return next(new AppError("No object found with given id.", 404));

    MakeResponse.success(res, 204, "Car successfully deleted");
  })

  export const UPDATE =  ErrorController.catchAsync( async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    const car = await CarValidator.validateUPDATE(req.body);

    const update = await repo.update(req.params.id, car);
    if(update.matchedCount === 0 || update.acknowledged === false) next(new AppError("No object found with the given ID" , 404))

    MakeResponse.success(res, 200, "Car succesfully updated" , car);
  })

  export const PATCH = ErrorController.catchAsync( async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    const queryFilter : FilterQuery<HydratedDocument<CarInterface>> = {"_id" : req.params.id};

    const {description} = req.body;
    console.log(description)
    console.log(req.body)
    if(typeof description !== "string" ) 
      next(new AppError("please provide a valid description string", 400));

    let car = await repo.findOne(queryFilter, NO_OPTIONS);
    let accessories = car!.accessories;

    const index = accessories.findIndex(accessory => accessory.description.includes(description));
    if(index === -1){
      accessories.push({description});
    }
    else{
      accessories = [...accessories.slice(0, index), ...accessories.slice(index + 1)];
    }
    
    await repo.update(req.params.id, {accessories} as any);

    MakeResponse.success(res, 200, "Car accessories succesfully updated" , accessories);
  })
}

export default CarController;