import express from 'express'
import cors from 'cors'
import path from 'path'
import ConnectToDB from './database/db.js'
import routeUser from './routes/userRoutes.js'
import routeChat from './routes/chatRoutes.js'
import routeMessages from './routes/messageRoutes.js'
import dotenv from 'dotenv'
import { app, server } from './socket/socket.js'
dotenv.config()
const __dirname=path.resolve()

app.use(express.json())
app.use(cors())

app.use('/api/user',routeUser)
app.use('/api/chats',routeChat)
app.use('/api/messages',routeMessages)

app.use(express.static(path.join(__dirname,"/client/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","build","index.html"))
})
ConnectToDB()

const port=process.env.PORT

server.listen(port,(res,req)=>{
    console.log(`Server is connected to ${port}`)
})
