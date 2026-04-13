import jwt from "jsonwebtoken";
import { USER_ROLES } from "../constants.js";
// import UserRepository from "../../DB/Repositories/user.repository.js";
import envConfig from "../../config/env.config.js";
import { UserRepository } from "../../DB/Repositories/index.js";
const jwtSecret = envConfig.jwt;

export const generateToken = ({ payload, secret, options }) => {
  return jwt.sign(payload, secret, options);
};

export const verifyToken = ({ token, secret, options }) => {
  return jwt.verify(token, secret, options);
};

export const createLoginCredentials = ({ payload, secret, options }) => {
  const accessToken = generateToken({
    payload,
    secret: secret || jwtSecret.user.accessSignature,
    options,
  });

  return { accessToken };
};

export const decodeToken = async ({ token }) => {
  const data = jwt.decode(token);

  if (!data.role) 
    throw new Error("invalid payload", { cause: { status: 400 } });


    const { accessSignature } = detectSignatureByRole({ role: data.role });

    const decodedData = verifyToken({ token, secret: accessSignature });

  if (!decodedData._id) 
      throw new Error("invalid payload", { cause: { status: 400 } });

      return UserRepository.findDocumentById(decodedData._id);
};

export const detectSignatureByRole = ({ role }) => {
  let signatures;
  if (role == USER_ROLES.ADMIN) {
    signatures = jwtSecret.admin;
  } else {
    signatures = jwtSecret.user;
  }

  return signatures;
};
