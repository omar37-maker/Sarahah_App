
import jwt from "jsonwebtoken"
import envConfig from "../../config/env.config.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
import { decodeToken, verifyToken } from "../../Common/index.js";
const jwtSecret = envConfig.jwt


export const getProfileService = async (headers) => {
    const accessToken = headers.authorization

    return decodeToken({ token: accessToken })
}