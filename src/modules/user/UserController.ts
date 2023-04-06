import { Request, Response, NextFunction } from 'express';
import { UserRepository } from './UserRepository';
import UserValidator from './UserValidator';
import UserInterface from './UserInterface';
import AuthController from '../../utils/AuthController';
import MakeResponse from '../../utils/MakeResponse';
import ErrorController from '../../errors/ErrorController';
import axios, { AxiosResponse } from 'axios';
import AppError from '../../errors/AppError';
import AddressInterface from './AddressInterface';

const repo = new UserRepository();
namespace UserController{

  // AUXILIARY FUNCTIONS
  async function getAddressByCep(cep: string): Promise<AddressInterface> {
    const response: AxiosResponse<any> = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

    const address : AddressInterface = {
      cep: +cep,
      patio: response.data.logradouro,
      complement : response.data.complement,
      neighborhood: response.data.bairro,
      locality: response.data.localidade,
      uf: response.data.uf,
    }
    return address;
  }

  export const GET = async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    // TODO:
  }

  export const signUp =  ErrorController.catchAsync( async(req: Request, res: Response, next : NextFunction): Promise<any> =>{
    const addr = await getAddressByCep(req.body.cep);

    let {cep , ...userData} = req.body;
    userData.address = addr;

    await UserValidator.validate(userData);

    const userDoc = await repo.create(userData);
    const token = await AuthController.signToken(userDoc._id);

    MakeResponse.success(res, 201, "User successfully created" , {"token": token});
  });

  export const signIn = async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    const { email, password } = req.body;

    if(!email || !password)
      return next(new AppError('Please provide email/password!', 400));

    const user = await repo.findOne('email', email, 'password');
    
    if(!user) return next(new AppError('User not found!', 404));
    
    const flag = await AuthController.comparePassword(user, password);
    if(!flag) return next(new AppError('Invalid email/password combo', 401))

    const token = await AuthController.signToken(user._id);

    MakeResponse.success(res, 200, "User successfully logged in", {"token" : token});
  }

  export const DELETE = async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  }

  export const UPDATE = async (req: Request, res: Response, next : NextFunction) : Promise<any> =>{
    // TODO:
  }
}

export default UserController;