import MessagesModel from "../models/MessagesModel.js";

//CreateMessage
export const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body

    try {
        const message = new MessagesModel({
            chatId, senderId, text
        })
        const response = await message.save()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}

//getMessages
export const getMessages = async (req, res) => {
    const { chatId } = req.params
    try {
        const messages = await MessagesModel.find({ chatId })
        if (!messages)
            return res.status(400).json({
                message: "No messages to show"
            })

        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}