const mongoose = require('mongoose')

const users = require('./user')
const messages = require('./message')

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL)
}

const models = {
    users,
    messages
}

module.exports.connectDb = connectDb

module.exports.models = models