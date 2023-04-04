import { FilterQuery, HydratedDocument } from "mongoose";

export default interface IWrite<T> {
  create(item: T): Promise<HydratedDocument<T>> ;
  update(id: string, item: T): any ;
  delete(filter: FilterQuery<T>[]): any ;
}