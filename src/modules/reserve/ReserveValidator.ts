import Joi from "joi";
import ReserveInterface from "./ReserveInterface";
import AppError from "../../errors/AppError";
import { ReserveRepository } from "./ReserveRepository";

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

  export const validatePOST = async (reserve : ReserveInterface) => {
    return await ReserveValidation.options({ presence: 'required' }).required().validateAsync(reserve);
  }

  export const validateUPDATE = async (reserve : ReserveInterface) => {
    return await ReserveValidation.validateAsync(reserve);
  }

  function datesIntersect(start1: Date, end1: Date, start2: Date, end2: Date) : boolean {
    return (start1 <= end2 && start2 <= end1);
  }

  export const checkTimeframeIntersection = async(start : Date, end :Date, car_id : string, carModel : string) =>{
    const reservations =  await repo.find({id_car : car_id}, NO_OPTIONS);

    let hasIntersection = false;
    for (const {start_date, end_date} of reservations) {
      hasIntersection = datesIntersect(start, end, start_date, end_date);
      if(hasIntersection) break;
    }
    if(hasIntersection) throw new AppError(`this ${carModel} already has a booking within the timeframe`, 400);
  }

}

export default ReserveValidator;