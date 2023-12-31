const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const mainRoute = require('./routes/index.js')
const logger = require('morgan')
const cors = require('cors')
const port = 5000
dotenv.config()

// MIDDLEWARE
app.use(express.json())
app.use(logger('dev'))
app.use(cors())

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DB')
    } catch (error) {
        throw error;
    }
}

app.use('/api', mainRoute)
app.listen(port, () => {
    connect()
    console.log('Port Isleyir')
})