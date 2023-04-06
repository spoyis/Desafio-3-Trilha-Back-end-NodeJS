import IWrite from './IWrite';
import IRead from './IRead';

import {Model, Document, HydratedDocument, QueryWithHelpers, FilterQuery, QueryOptions, UpdateQuery} from 'mongoose';

export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  private readonly _model: Model<T>;

  constructor(model : Model<T>) {
    this._model = model;
  }

  async create(item: T):  Promise<HydratedDocument<T>> {
    return this._model.create(item);
  }

  async update(id: string, item: T){
    const options : QueryOptions<Document<T>> = {runValidators : true, new: true}
    console.log(item)
    return this._model.updateOne({_id: id}, item as any, options);
  }
  
  async delete(filter : FilterQuery<HydratedDocument<T>>){
    return this._model.deleteMany(filter);
  }

  async find(propertyName : string, item: any , selectFilter? : string) {
    const object = {[propertyName] : item};
    if(selectFilter)
      return this._model.find(object as FilterQuery<T>).select(selectFilter);
    else
      return this._model.find(object as FilterQuery<T>);
  }

  async findOne(propertyName : string, item: any , selectFilter? : string)  {
    const object = {[propertyName] : item};
    
    if(selectFilter)
      return this._model.findOne(object as FilterQuery<T>).select(selectFilter);
    else
      return this._model.findOne(object as FilterQuery<T>);
  }
}