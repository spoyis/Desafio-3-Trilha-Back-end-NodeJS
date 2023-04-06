import AppError from './AppError';
import { Request, Response, NextFunction } from 'express';

namespace ErrorController{

  const handleDuplicateFieldsDB = (err : any) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  };

  export const globalErrorHandler = async (err : any, req: Request, res: Response, next: NextFunction) =>{

      console.log('here')
      err.statusCode = err.statusCode || 500;
      err.status = err.status || 'fail';

      if(err.statusCode === 500){
        console.log('ERROR: ')
        console.log(err.stack!)
      }
         
      if (err.code === 11000) err = handleDuplicateFieldsDB(err);

      return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      //stack: err.stack
    });
  }

  export const catchAsync = (fn : Function) =>{
    return(req : Request, res : Response, next : NextFunction) =>{
      fn(req, res, next).catch(next);
    }
  }
}

export default ErrorController;