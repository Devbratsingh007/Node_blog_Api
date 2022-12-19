const express = require('express')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const {errorHandler} = require('./backend/middleware/errorHandler')
const connectDB = require('./backend/config/db')
const authRout = require('./backend/routes/userRout')
const postRout = require('./backend/routes/postRout')


const port =  process.env.PORT || 5000

connectDB()

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use(express.urlencoded({ extended:false}))

// app.use('/api/auth', authRout)
app.use('/api/auth', authRout)
app.use('/api/post', postRout)

// app.use('', require('./routes/goalRoutes'))
app.use(errorHandler)

app.listen(port, () => { console.log(`server started sucessfully ${port}`)}) 

