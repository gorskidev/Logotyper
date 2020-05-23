const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Party = new Schema(
    {
        members: {
            type: Array,
            required: true
        },
        messages: {
            type: Array,
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
const PartyInfo = db.model('global', Party)
module.exports = PartyInfo