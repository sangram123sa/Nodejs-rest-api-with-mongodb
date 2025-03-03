const express = require('express');

const {connectMongoDb} = require("./connection")
const {logReqRes} = require("./middlewares/index") 
const userRouter = require('./routes/user')

const app = express()
const port = 8000

connectMongoDb("mongodb://127.0.0.1:27017/my-app")



// This is a pre-defined middleware. 
app.use(express.urlencoded({extended:false}))
app.use(logReqRes("log.txt"))



// routes
app.use('/user', userRouter)

app.listen(port, () => console.log(`http://localhost:${port}`))