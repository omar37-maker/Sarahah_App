
import { decode } from "jsonwebtoken";
import { encrypt, hash, compare, createLoginCredentials, decodeToken, TOKEN_TYPES } from "../../Common/index.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
import envConfig from "../../config/env.config.js";

const jwtSecret = envConfig.jwt

export const registerService = async (body) => {
    console.log({body});
    
    const { firstname, lastname, email, password, gender, phone } = body

    const checkEmailDuplication = await UserRepository.findOneDocument({ email }, { email: 1 })
    
    console.log({checkEmailDuplication});
    

    if (checkEmailDuplication) {
        throw new Error("email already exists", { cause: { status: 409 } })
    }
    const hashedPassword = await hash(password , 12)
    const userObject = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        gender

    }

    if (phone) {
        userObject.phone = encrypt(phone)
    }
    return UserRepository.createDocument(userObject)
}

export const loginService = async (body) => {
    const { email, password } = body
    
    const user = await UserRepository.findOneDocument({ email })
    
    if (!user) {
        throw new Error("Invalid email or password ", {cause:{status:401}})
    }
    const isPasswordValid = await compare(password, user.password)   
    
    if (!isPasswordValid) {
        throw new Error("Invalid email or password", {cause:{status:401 }})
    }

    let tokePayload = {_id: user._id, email, role:user.role}
    const { accessToken, refreshToken } = createLoginCredentials({
      payload: tokePayload,
      options: {
        access: {
          expiresIn: jwtSecret[user.role].accessExpiration,
        },

        refresh: {
          expiresIn: jwtSecret[user.role].refreshExpiration,
        },
      },
    });

    return { accessToken, refreshToken }
    
}

export const refreshTokenService = async (header) => {
    const { authorization: refreshToken } = header
    const { decodeToken } = await decodeToken({ token: refreshToken, tokenType: TOKEN_TYPES.REFRESH })
    
     const { accessToken } = createLoginCredentials({
       payload: {_id: decodedData._id, role:decodedData.role, email: decodedData.email},
       options: {
         access: {
           expiresIn: jwtSecret[decodedData.role].accessExpiration,
           },
           
         },
       requiredToken: TOKEN_TYPES.ACCESS
     });

     return { accessToken };
}

