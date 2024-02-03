import express from 'express'
import {findUsers, getUser, logincontroller, usercontroller} from '../controllers/userController.js'

const routeUser=express()

routeUser.post('/register',usercontroller)

routeUser.post('/login',logincontroller)

routeUser.get('/getuser/:userId',getUser)

routeUser.get('/',findUsers)



export default routeUser