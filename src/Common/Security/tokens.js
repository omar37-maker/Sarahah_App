import jwt from "jsonwebtoken";
import { USER_ROLES } from "../constants.js";
import envConfig from "../../config/env.config.js";
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

export const decodeToken = async ({ token, secret }) => {
  const data = jwt.decode(token);
  console.log({ data });

  if (!data.role) {
    throw new Error("Invalid token", { cause: { status: 400 } });
  }

  const { accessSignature } = detectSignatureByRole({ role: data.role });
  console.log({ accessSignature });

  const decodedData = verifyToken({ token, secret: accessSignature });
  console.log({ decodedData });

  if (!decodedData.sub) {
    throw new Error("Invalid token", { cause: { status: 400 } });
  }

  const { default: UserRepository } =
    await import("../../DB/Repositories/user.repository.js");
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
