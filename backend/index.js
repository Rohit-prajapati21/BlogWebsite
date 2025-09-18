require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const mongodbConnection = require('./config/db')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const checkAuthorization = require('./middlewares/auth')

mongodbConnection()
app.use(
  cors({
    origin: 'https://blog-website-three-ruddy.vercel.app', // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/post', checkAuthorization, postRouter)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
