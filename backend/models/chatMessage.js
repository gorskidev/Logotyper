const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        content: {
            type: Object,
            required: true
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'globals'
    }
)

const db = mongoose.connection.useDb('chat');
const UserInfo = db.model('global', Message)
module.exports = UserInfo