const { Schema, model } = require('mongoose');

const users = new Schema({
    login: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
}, {collection: 'users'})

exports.users = model('users', users);