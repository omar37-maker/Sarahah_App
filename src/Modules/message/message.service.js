import messageRepository from "../../DB/Repositories/message.repository.js";



export const sendMessage = (body) => {
    const { content, receivrId } = body
    return messageRepository.createNewMessage({ content, receivrId })
}