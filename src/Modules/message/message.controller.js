import { Router } from "express";
import * as messageService from "./message.service.js";

const messageController = Router()

messageController.post("/send", (req, res) => { 
    const success = messageService.sendMessage(req.body)
    res.status(201).json({ success })

})

export default messageController