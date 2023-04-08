import { Schema } from "mongoose";

export default interface ReserveInterface{
  start_date: Date,
  end_date: Date,
  id_car: Schema.Types.ObjectId,
  id_user: Schema.Types.ObjectId,
  final_value: number
}