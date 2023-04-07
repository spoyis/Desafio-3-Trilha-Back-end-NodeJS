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

  export const GET = async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    // TODO:
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