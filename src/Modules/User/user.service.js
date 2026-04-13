import jwt from "jsonwebtoken";
import envConfig from "../../config/env.config.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
import { decodeToken, verifyToken } from "../../Common/index.js";
const jwtSecret = envConfig.jwt;

export const getProfileService = async (headers) => {
  const accessToken = headers.authorization;

  const decodedData = await decodeToken({ token: accessToken }); 

  return await UserRepository.findDocumentById(decodedData._id); 
};
