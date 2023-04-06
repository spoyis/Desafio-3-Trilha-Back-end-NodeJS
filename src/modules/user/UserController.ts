import { Request, Response, NextFunction } from 'express';
import { UserRepository } from './UserRepository';
import UserValidator from './UserValidator';
import UserInterface from './UserInterface';
import AuthController from '../../utils/AuthController';
import MakeResponse from '../../utils/MakeResponse';
import ErrorController from '../../errors/ErrorController';
import AppError from '../../errors/AppError';

const repo = new UserRepository();
namespace UserController{

  export const GET = async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    // TODO:
  }

  export const signUp =  ErrorController.catchAsync( async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    // TODO: get cep data
    const userData = await UserValidator.validate(req.body);
    console.log(userData)

    const userDoc = await repo.create(userData);
    const token = await AuthController.signToken(userDoc._id);

    MakeResponse.success(res, 201, "User successfully created" , token);
  });

  export const signIn = async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  }

  export const DELETE = async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  }

  export const UPDATE = async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  }
}

export default UserController;