import { HydratedDocument, FilterQuery, QueryOptions } from "mongoose";

export default interface IRead<T> {
  find(filter : FilterQuery<HydratedDocument<T>> , options : QueryOptions<HydratedDocument<T>>, selectFilter? : string): any;
  findOne(filter : FilterQuery<HydratedDocument<T>> , options : QueryOptions<HydratedDocument<T>>, selectFilter? : string) : any ;
}