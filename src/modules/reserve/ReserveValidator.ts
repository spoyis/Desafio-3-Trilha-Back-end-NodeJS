import Joi from "joi";
import ReserveInterface from "./ReserveInterface";

namespace ReserveValidator{

  const ReserveValidation = Joi.object({

    start_date: Joi.date()
    .messages({

    }),

    end_date: Joi.date()
    .timestamp().min(Joi.ref("start_date"))
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

}

export default ReserveValidator;