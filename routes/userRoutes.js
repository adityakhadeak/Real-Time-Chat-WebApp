import express from 'express'
import usercontroller from '../controllers/usercontrollers/userController.js'

const routeUser=express()

routeUser.get('/register',usercontroller)

export default routeUser