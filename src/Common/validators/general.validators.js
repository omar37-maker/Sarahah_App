import Joi from "joi";
import { isValidObjectId } from "mongoose";

const ObjectId = (value, helper) => {
  return isValidObjectId(value) ? value : helper.message(`Invalid ObjectId`);
};

export const generalValidators = {
  _id: Joi.custom(ObjectId),

  email: Joi.string().email({ tlds: { allow: ["com", "org"] } }),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .min(6),
};
