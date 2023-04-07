import Joi from "joi";
import CarInterface from "./CarInterface";

namespace CarValidator{

  const FABRICATION_LOWER_BOUND = 1950;
  const FABRICATION_UPPER_BOUND = new Date().getFullYear();

  const ACCESSORIES_LOWER_BOUND = 1;

  const CarValidation = Joi.object({

    model: Joi.string()
    .required()
    .messages({

    }),

    color: Joi.string()
    .required()
    .messages({

    }),
    
    year: Joi.number()
    .min(FABRICATION_LOWER_BOUND)
    .max(FABRICATION_UPPER_BOUND)
    .required()
    .messages({

    }),

    value_per_day: Joi.number()
    .required()
    .messages({

    }),

    accessories: Joi.array()
    .items(Joi.string())
    .unique()
    .required()
    .min(ACCESSORIES_LOWER_BOUND)
    .messages({

    }),

    number_of_passengers: Joi.number()
    .required()
    .messages({

    })
  })
}

export default CarValidator;