import { Request, Response, NextFunction } from 'express';
import { UserRepository } from './UserRepository';
import UserInterface from './UserInterface';

const repo = new UserRepository();
namespace UserController{

  export const GET = async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    // TODO:
  }

  export const signUp =  async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    // TODO:
  }

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