import jwt from "jsonwebtoken";
import { TOKEN_TYPES, USER_ROLES } from "../constants.js";
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

export const createLoginCredentials = ({ payload, options, requiredToken }) => {
  const signatures = getSignatureByTypeAndRole({ role: payload.role, both: true })
 
  
 let accessToken, refreshToken;
  switch (requiredToken) {
    case TOKEN_TYPES.ACCESS:
      const accessToken = generateToken({
        payload,
        secret: signatures.accessSignature,
        options: options.access,
      });
      break;
    case TOKEN_TYPES.REFRESH:
      const refreshToken = generateToken({
        payload,
        secret: signatures.refreshSignature,
        options: options.refresh,
      });
      break
    default:
       accessToken = generateToken({
        payload,
        secret: signatures.accessSignature,
        options: options.access
    
  })
       refreshToken = generateToken({
        payload,
        secret: signatures.refreshSignature,
        options: options.refresh
  })
      break
  }
  return { accessToken, refreshToken };
};

export const decodeToken = async ({ token, tokenType }) => {
  const data = jwt.decode(token);

  if (!data.role) throw new Error("invalid payload", { cause: { status: 400 } });


  const signature = getSignatureByTypeAndRole({ role: data.role, tokenType })
  const decodedData = verifyToken({ token, secret: signature });
  if (!decodedData._id) throw new Error("invalid payload", { cause: { status: 400 } });
  const user = await UserRepository.findDocumentById(decodedData._id);

  return { user, decodeToken }
  
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


export const getSignatureByTypeAndRole = ({ role, tokenType, both=false }) => {
  const signatures = detectSignatureByRole({ role })

  if(both) return signatures
  
  let tokenSignature
  switch (tokenType) {
    case TOKEN_TYPES.ACCESS:
      tokenSignature = signatures.accessSignature
      break
    case TOKEN_TYPES.REFRESH:
      tokenSignature = signatures.refreshSignature
      break
    default:
      throw new Error('Invalid token type', { cause: { status: 409 } })
    
  }
  return tokenSignature
}
