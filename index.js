require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/database')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
var morgan = require('morgan')

connectDB()

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
