import { UserRepository } from "../../DB/Repositories/index.js";


export const getProfileService = (req) => {

  return req.user
};

export const updateUserProfile = async (user, body) => {
  const { _id } = user
  const { firstName, lastName, age, gender, email } = body
  
  if (email) {
    const existingUser = await UserRepository.findOneDocument({ email })
    if (existingUser) {
      throw new Error("Email already exists", {cause: {status:409}})
    }
  }
  return UserRepository.updateWithFindById({id: _id, data: { firstName, lastName, age, gender, email }, options: {new:true}})
}

export const getAllUsers = async () => {
  return UserRepository.findDocuments({})
}