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
    return this._model.updateOne({_id: id}, item as any);
  }
  
  async delete(filter : FilterQuery<HydratedDocument<T>>){
    return this._model.deleteMany(filter);
  }

  async find(filter : FilterQuery<HydratedDocument<T>>, options : QueryOptions<HydratedDocument<T>> , selectFilter? : string) {
    if(selectFilter)
      return this._model.find(filter, {}, options).select(selectFilter);
    else
      return this._model.find(filter, {}, options);
  }

  async findOne(filter : FilterQuery<HydratedDocument<T>> , options : QueryOptions<HydratedDocument<T>>, selectFilter? : string)  {
    
    if(selectFilter)
      return this._model.findOne(filter, {}, options).select(selectFilter);
    else
      return this._model.findOne(filter, {}, options);
  }
}