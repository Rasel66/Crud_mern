const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    age:{
        type: 'number',
        required: true
    },
    phone:{
        type: 'number',
        required: true
    },
    profession:{
        type: 'string',
        required: true
    },
    address:{
        type: 'string',
        required: true
    },
    msg:{
        type: 'string',
        required: true
    }
})

const users = new mongoose.model("users", userSchema);

module.exports = users;