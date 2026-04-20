import { BadRequestException } from "../../Common/index.js";
import { UserRepository } from "../../DB/Repositories/index.js";
import userRepository from "../../DB/Repositories/user.repository.js";


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


export const uploadProfilePicture = async (user, file) => {
  if (!file || !file.path) throw new BadRequestException('File is required')
  return userRepository.updateWithFindById({
    id: user._id,
    data: { profilePicture: file.path },
    options:{new:true}
  })
}