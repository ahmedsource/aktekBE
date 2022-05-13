const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleWare/errorMiddleware')

const userRoutes = require('./routes/userRoutes')
const connectDb = require('./config/db')
const port = process.env.PORT || 5000
connectDb()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api/users', userRoutes)

app.use(errorHandler)
app.listen(port, ()=> console.log(`server started on ${port}`))