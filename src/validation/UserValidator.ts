import Joi from "joi";
import UserInterface from "../interfaces/UserInterface";
import addressSchema from "../models/Address";

namespace UserValidator{

  const NAME_LOWER_BOUND = 3;
  const NAME_UPPER_BOUND = 30;

  const PASSWORD_LOWER_BOUND = 5;
  const PASSWORD_UPPER_BOUND = 64;

  const cpf_validator = (value : string, helper : Joi.CustomHelpers) =>{
    // TODO:
    return value;
  }

  const addressValidation = Joi.object({
    cep: Joi.number()
    .required()
    .messages({

    }),

    patio: Joi.string()
    .required()
    .messages({

    }),

    complement: Joi.string()
    .messages({

    }),

    neighborhood: Joi.string()
    .required()
    .messages({

    }),

    locality: Joi.string()
    .required()
    .messages({

    }),

    uf: Joi.string()
    .required()
    .messages({
      
    })
  });

  const userValidation = Joi.object({

    name: Joi.string()
    .required()
    .min(NAME_LOWER_BOUND)
    .max(NAME_UPPER_BOUND)
    .messages({
      "string.base": "The user's name should be a type of text.",
      "string.required": "A user must have a name.",
      "string.min": `The given user name must have a minimum of ${NAME_LOWER_BOUND} characters.`,
      "string.max": `The given user name must have a maximum of ${NAME_UPPER_BOUND} characters.`
    }),

    cpf: Joi.string()
    .required()
    .custom(cpf_validator)
    .messages({
      "string.base": "The user's CPF should be a type of text.",
      "string.required": "A user must have a CPF.",
      "cpf.invalid": "The given CPF is invalid!."
    }),

    birthDate: Joi.date()
    .required()
    .messages({
      "date.base": "The provided date must be valid.",
      "date.required": "A user must have a birthday."
    }),

    email: Joi.string()
    .required()
    .email()
    .messages({
      "string.email": "The given email must be valid.",
      "string.required": "A user must have an email."
    }),

    password: Joi.string()
    .required()
    .min(PASSWORD_LOWER_BOUND)
    .max(PASSWORD_UPPER_BOUND)
    .messages({
      "string.base": "The given password should be a type of text.",
      "string.required": "A user must have a password.",
      "string.min": `The given password must have a minimum of ${PASSWORD_LOWER_BOUND} characters.`,
      "string.max": `The given password must have a maximum of ${PASSWORD_UPPER_BOUND} characters.`
    }),

    qualified: Joi.boolean()
    .required()
    .messages({
      "boolean.base" : 'The qualified entry must be a boolean or a "yes"/"no" string.',
      "boolean.required" : "A user must inform if he is qualified to drive."
    }),

    address: addressValidation
  });

  export const validate = async (user : UserInterface) => {
    return await userValidation.validateAsync(user);
  }
}

export default UserValidator;