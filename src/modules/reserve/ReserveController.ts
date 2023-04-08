import { Request, Response, NextFunction } from 'express';
import { ReserveRepository } from './ReserveRepository';
import ReserveInterface from './ReserveInterface';
import ErrorController from '../../errors/ErrorController';


const repo = new ReserveRepository();

namespace ReserveController{

  export const POST =  ErrorController.catchAsync( async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    // TODO:
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