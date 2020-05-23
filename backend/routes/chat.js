const chat = require('express').Router();
const chatMessage = require('../models/chatMessage');
const chatParty = require('../models/chatParty');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const keys = require('../config/keys')

const { validateLogin, validateRegister } = require('../utils/Validation')
module.exports = chat;

chat.get('/party/:id', (req, res) => {
    const { id } = req.params
    chatParty.findById(id)
    .then(result => res.json({
        result
    }))
})

chat.post('/create', (req, res) => {
    const { _id, _recipientId } = req.body
    const Party = new chatParty();

    /*User.findById(_id)
    .then(res => console.log(res))*/

    Party.members = [{_id}, {_recipientId}]
    
    Party.save()
    .then(result => {
        User.findByIdAndUpdate(_id, {$push: {chatparties: result._id}}, {useFindAndModify: false})
        .catch(err => console.log(err))
        
        User.findByIdAndUpdate(_recipientId, {$push: {chatparties: result._id}}, {useFindAndModify: false})
        .catch(err => console.log(err))


        res.json({
            success: true
        });
    });
});

chat.post('/send/:chatid', (req, res) => {
    const { _id, _recipientId, messageContent } = req.body
    const { chatid } = req.params

    console.log(chatid)

    chatParty.findByIdAndUpdate(chatid, {$push: {messages: {_senderId: _id, message: messageContent}}}, {useFindAndModify: false})
    .then(result => res.json({success: true}))
})