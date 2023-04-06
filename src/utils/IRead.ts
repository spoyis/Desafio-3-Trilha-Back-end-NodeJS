import { HydratedDocument } from "mongoose";

export default interface IRead<T> {
  find(propertyName : string, item: any , selectFilter? : string): any;
  findOne(propertyName : string, item: any , selectFilter? : string) : any ;
}