import { HydratedDocument, FilterQuery } from "mongoose";

export default interface IRead<T> {
  find(filter : FilterQuery<HydratedDocument<T>> , selectFilter? : string): any;
  findOne(filter : FilterQuery<HydratedDocument<T>> , selectFilter? : string) : any ;
}