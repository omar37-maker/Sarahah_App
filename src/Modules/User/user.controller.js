import { Router } from "express";
import * as userService from "./user.service.js";
import { authenticate, authrize } from "../../Middlewares/authentication.middlewares.js";
import { USER_ROLES } from "../../Common/constants.js";
import multerLocal from "../../Middlewares/multer.middleware.js";

const userController = Router() 

userController.get("/profile",authenticate, async (req, res) => {
    const data = await userService.getProfileService(req)
    res.json(data)
})

userController.put("/update", authenticate, async (req, res) => {
    const result = await userService.updateUserProfile(req.user, req.body)
    res.status(200).json({message: "User update successfully", data: result})
})

userController.get("/all", authenticate, authrize([USER_ROLES.USER, USER_ROLES.ADMIN]), async (req, res) => {
    const result = await userService.getAllUsers()
    res.status(200).json({ message: "Users retrived successffuly", data: result})
})

userController.patch("/upload/profile", authenticate, multerLocal('profiles').single('profilePicture'), async (req, res) => {
    console.log(req.file);
    const result = await userService.uploadProfilePicture(req.user, req.file)
    res.status(200).json({ message: "Profile picture uploaded successfully", data: result })
    
})

export default userController