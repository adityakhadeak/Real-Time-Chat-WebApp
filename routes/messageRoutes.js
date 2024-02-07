import express from 'express'
import { createMessage, getMessages } from '../controllers/messagesController.js'

const routeMessages=express()

routeMessages.post('/',createMessage)
routeMessages.get('/getmessages/:chatId',getMessages)

export default routeMessages