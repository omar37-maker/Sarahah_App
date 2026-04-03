import mongoose from "mongoose";
import { GENDER, USER_ROLES, STATUS } from "../../Common/index.js";


const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "firstname must be at least 3 characters long"],
      maxlength: [50, "firstname must be at most 50 characters long"],
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "lastname must be at least 3 characters long"],
      maxlength: [50, "lastname must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      index: {
        name: "email_index",
        unique: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER
    },
    gender: {
      type: String,
      enum: Object.values(GENDER)
    },
    status: {
      type: String,
        enum: Object.values(STATUS),
      default: STATUS.ACTIVE
    },
    phoneNumber: String
  },
  {
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  },
);

userSchema.virtual('fullname').get(function () {
    return this.firstname + " " + this.lastname 
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;