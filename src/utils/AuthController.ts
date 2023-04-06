import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import UserInterface from "../modules/user/UserInterface";
import { HydratedDocument } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../modules/user/UserRepository";
import AppError from "../errors/AppError";

namespace AuthController{

  const secret : Secret = process.env.JWT_SECRET as string;
  const options : SignOptions = { expiresIn: process.env.JWT_EXPIRES_IN }
  const userRepo : UserRepository = new UserRepository();

  export const signToken = async (id: any) => {
    return jwt.sign( {id} , secret , options);
  };

  export const comparePassword = async (user : HydratedDocument<UserInterface>, candidatePassword : string) => {
      return await bcrypt.compare(candidatePassword, user.password);
  }

  export const protectRoute = async (req: Request, res: Response, next : NextFunction) => {
    req.body.validatedUser = null;
    if(!req.headers.authorization)
      return next( new AppError('You need to be logged in to access this route', 401) );

    const token = req.headers.authorization.split(" ")[1];

    const validation : any = await jwt.verify(token, secret);
    const selectedUser = await userRepo.findOne('_id', validation.id);

    if(!selectedUser)
      next( new AppError('Validation failed, user not found or does not exist', 400) );
  
    req.body.validatedUser = selectedUser;
    return next();
  }
}



export default AuthController;