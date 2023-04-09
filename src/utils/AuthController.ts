import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import UserInterface from "../modules/user/UserInterface";
import { HydratedDocument } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../modules/user/UserRepository";
import ErrorController from "../errors/ErrorController";
import AppError from "../errors/AppError";

namespace AuthController{

  const secret : Secret = process.env.NODE_ENV !== "test" ? process.env.JWT_SECRET as string : '123';
  const options : SignOptions = process.env.NODE_ENV !== "test" ? { expiresIn: process.env.JWT_EXPIRES_IN } : { expiresIn: '12H' }
  const userRepo : UserRepository = new UserRepository();

  export const signToken = async (id: any) => {
    return jwt.sign( {id} , secret , options);
  };

  export const comparePassword = async (user : HydratedDocument<UserInterface>, candidatePassword : string) => {
    return await bcrypt.compare(candidatePassword, user.password);
  }

  export const  protectRoute = ErrorController.catchAsync(async (req: Request, res: Response, next : NextFunction) => {
    (req as any).user = null;
    if(!req.headers.authorization)
      return next( new AppError('You need to be logged in to access this route', 403) );

    const token = req.headers.authorization.split(" ")[1];

    const validation : any = await jwt.verify(token, secret);
    const selectedUser = await userRepo.findOne({_id: validation.id}, {});

    if(!selectedUser)
      next( new AppError('Validation failed, user not found or does not exist', 403) );
  
    (req as any).user = selectedUser;
    return next();
  });
}



export default AuthController;