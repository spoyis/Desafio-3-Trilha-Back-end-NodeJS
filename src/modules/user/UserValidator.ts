import Joi from "joi";
import UserInterface from "./UserInterface";
import addressSchema from "./AddressSchema";

namespace UserValidator{

  export const NAME_LOWER_BOUND = 3;
  export const NAME_UPPER_BOUND = 30;

  export const PASSWORD_LOWER_BOUND = 6;
  export const PASSWORD_UPPER_BOUND = 64;

  function extractCPFDigits(CPF: string) : Array<number> {
    const digits = CPF.replace(/\D/g, '');
    return digits.split('').map(digit => Number(digit));
  }

  const cpf_validator = (value : string, helper : Joi.CustomHelpers) =>{
    const digits = extractCPFDigits(value);
    if (digits.length !== 11) {
      return helper.error("cpf.invalid");
    }

    const weights1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    const dv1 = weights1.reduce((acc, weight, index) => {
      return acc + digits[index] * weight;
    }, 0) % 11;

    const dv2 = weights2.reduce((acc, weight, index) => {
      return acc + digits[index] * weight;
    }, 0) % 11;

    const isValid = digits[9] === (dv1 < 2 ? 0 : 11 - dv1) && digits[10] === (dv2 < 2 ? 0 : 11 - dv2);

    return isValid ? value : helper.error("cpf.invalid");
  }

  const addressValidation = Joi.object({
    cep: Joi.number()
    .required()
    .messages({
      "number.base" : "The user's cep should be a type of number.",
      "number.required" : "The user needs a cep number."
    }),

    patio: Joi.string()
    .messages({
      "string.base" : "The user's address patio should be a type of text.",
    }),

    complement: Joi.string()
    .messages({
      "string.base" : "The user's address complement should be a type of text.",
    }),

    neighborhood: Joi.string()
    .messages({
      "string.base" : "The user's neighborhood should be a type of text."
    }),

    locality: Joi.string()
    .required()
    .messages({
      "string.base" : "The user's locality should be a type of text.",
      "string.required" : "The user's address needs a locality."
    }),

    uf: Joi.string()
    .required()
    .messages({
      "string.base" : "The user's uf should be a type of text.",
      "string.required" : "The user's address needs a UF (Unidade Federativa)."
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

    address: addressValidation.required()
  });

  export const validate = async (user : UserInterface) => {
    return await userValidation.validateAsync(user);
  }
}

export default UserValidator;