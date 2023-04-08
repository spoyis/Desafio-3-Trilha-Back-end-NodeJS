import Joi from "joi";
import CarInterface from "./CarInterface";

namespace CarValidator{

  export const FABRICATION_LOWER_BOUND = 1950;
  export const FABRICATION_UPPER_BOUND = new Date().getFullYear();

  export const ACCESSORIES_LOWER_BOUND = 1;

  const CarValidation = Joi.object({

    model: Joi.string()
    .messages({

    }),

    color: Joi.string()
    .messages({

    }),
    
    year: Joi.number()
    .min(FABRICATION_LOWER_BOUND)
    .max(FABRICATION_UPPER_BOUND)
    .messages({

    }),

    value_per_day: Joi.number()
    .messages({

    }),

    accessories: Joi.array()
    .items(
      Joi.object({
        description: Joi.string()
  
        .messages({"string.required" : "an accessory needs a description"})
      }))
    .unique()
    .min(ACCESSORIES_LOWER_BOUND)
    .messages({

    }),

    number_of_passengers: Joi.number()
    .messages({

    })
  })

  export const validatePOST = async (car : CarInterface) => {
    return await CarValidation.options({ presence: 'required' }).required().validateAsync(car);
  }

  export const validateUPDATE = async (car : CarInterface) => {
    return await CarValidation.validateAsync(car);
  }
}

export default CarValidator;