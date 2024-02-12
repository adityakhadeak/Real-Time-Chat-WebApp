import { Server } from "socket.io";
import express from 'express'
import http from 'http'

const app=express()

const server=http.createServer(app)
const io =new Server(server,{cors:"https://vaartarealtimechatapp.vercel.app/"})

let onlineUsers=[]
io.on('connection',(socket)=>{
    console.log('New Connection' , socket.id)

    socket.on("addNewUser",(userId)=>{
        !onlineUsers.some((user)=> user.userId===userId)&&
        onlineUsers.push({userId,socketId:socket.id})
        io.emit('getOnlineUsers',onlineUsers)
    })

    socket.on('sendMessage',(message)=>{
        const user=onlineUsers.find((user)=>user.userId===message.recipientUserId)
       
        if(user){
            io.to(user.socketId).emit("getMessage",message)
            io.to(user.socketId).emit("getNotifications",
            {
                senderId:message.senderId,
                isRead:false,
                text:message.text,
                date:new Date()
            })

        }
    })
    socket.on("disconnect",()=>{
        onlineUsers=onlineUsers.filter((user)=>user.socketId!=socket.id)
        io.emit('getOnlineUsers',onlineUsers)

    })

})

export {app,server,io}