
import { Message } from "../../DB/Models/index.js";


class MessageRepository { 
    createNewMessage(data) {
        return Message.create(data)
    }

    findOneMessage(filters) {
        return Message.findOne(filters)
    }

    findMessage(filters) {
        return Message.find(filters)
    }   
}   

export default new MessageRepository()  