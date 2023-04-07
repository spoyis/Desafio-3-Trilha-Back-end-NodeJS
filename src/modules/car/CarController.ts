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

  export const GET = async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    let queryOptions: QueryOptions<HydratedDocument<CarInterface>> = {"limit": PAGE_SIZE};
    const queryFilter : FilterQuery<HydratedDocument<CarInterface>> = req.params.id ? {"_id" : req.params.id, ...req.query} :  { ...req.query}

    const pageIndex = +req.body.pageIndex || 0;
    queryOptions.skip = pageIndex * PAGE_SIZE;

    let cars = await repo.find(queryFilter, queryOptions);

    MakeResponse.success(res, 200, `retrieved ${cars.length} car(s) at page ${pageIndex}`, cars);
  }

  export const POST =  ErrorController.catchAsync( async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    const car = await CarValidator.validate(req.body);

    const carDoc = await repo.create(car);

    MakeResponse.success(res, 201, "Car succesfully registered" , car);
  });

  export const DELETE = async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  }

  export const UPDATE = async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  }

  export const PATCH = async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  }
}

export default CarController;