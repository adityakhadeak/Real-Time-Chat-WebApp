import express from "express";
import { createChat, findChat, findUserChats } from "../controllers/chatController.js";

const routeChat=express()

routeChat.post('/',createChat)
routeChat.get('/:userId',findUserChats)
routeChat.get('/find/:firstId/:secondId',findChat)

export default routeChat