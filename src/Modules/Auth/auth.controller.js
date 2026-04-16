import { Router } from "express";
import * as authService from "./auth.service.js";

const authController = Router() 

authController.post('/register', async (req, res) => {
    const result = await authService.registerService(req.body)
    res.status(201).json({ message: "user created successfully", data: result }) 
    
})

authController.post('/login', async (req, res) => {
    const result = await authService.loginService(req.body)
    res.status(200).json({message: "User logged in successfully", ...result })
})

authController.post('/refresh-token', async (req, res) => {
    const result = await authService.refreshTokenService(req.headers)
    res.status(200).json({message: "Token refreshed succeessfully", ...result})
})

export default authController