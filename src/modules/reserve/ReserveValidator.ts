import Joi from "joi";
import ReserveInterface from "./ReserveInterface";
import AppError from "../../errors/AppError";
import { ReserveRepository } from "./ReserveRepository";
import { FilterQuery, ObjectId } from "mongoose";

const repo = new ReserveRepository();

namespace ReserveValidator{
  const NO_OPTIONS = {};

  const ReserveValidation = Joi.object({

    start_date: Joi.date()
    .messages({

    }),

    end_date: Joi.date()
    .min(Joi.ref("start_date"))
    .messages({

    }),

    id_car: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({

    }),

    id_user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      
    }),

    final_value: Joi.number()
    .messages({

    })

  })

  export const validatePOST = async (reserve : ReserveInterface, car_id : ObjectId, user_id : ObjectId ,carModel : string) => {
    const reservation =  await ReserveValidation.options({ presence: 'required' }).required().validateAsync(reserve);

    await checkTimeframeIntersection(reserve.start_date, reserve.end_date, {id_car : car_id}, carModel);
    await checkTimeframeIntersection(reserve.start_date, reserve.end_date, {id_user : user_id}, 'user');

    return reservation;
  }

  export const validateUPDATE = async (reserve : ReserveInterface, car_id : ObjectId, user_id : ObjectId, carModel : string) => {
    const update = await ReserveValidation.validateAsync(reserve);

    await checkTimeframeIntersection(reserve.start_date, reserve.end_date, {id_car : car_id}, carModel);
    await checkTimeframeIntersection(reserve.start_date, reserve.end_date, {id_user : user_id}, 'user');

    return update;
  }

  function datesIntersect(start1: Date, end1: Date, start2: Date, end2: Date) : boolean {
    return (start1 <= end2 && start2 <= end1);
  }

  const checkTimeframeIntersection = async(start : Date, end :Date, filter : FilterQuery<any>, description : string) =>{
    const reservations =  await repo.find(filter, NO_OPTIONS);

    let hasIntersection = false;
    for (const {start_date, end_date} of reservations) {
      hasIntersection = datesIntersect(start, end, start_date, end_date);
      if(hasIntersection) break;
    }
    if(hasIntersection) throw new AppError(`this ${description} already has a booking within the timeframe`, 409);
  }

}

export default ReserveValidator;