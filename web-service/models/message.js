const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        unique: true,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
},
{timestamp: true}
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message