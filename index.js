import express from 'express'
import cors from 'cors'
import ConnectToDB from './database/db.js'
import routeUser from './routes/userRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const app=express()

app.use(express.json())
app.use(cors())

app.use('/api/user',routeUser)
ConnectToDB()
const port=process.env.PORT||3000

app.listen(port,(res,req)=>{
    console.log(`Server is connected to ${port}`)
})