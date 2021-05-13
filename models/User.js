const { Schema, model } = require('mongoose');

const users = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        required: true,
        default: 'USER'
    }
}, {collection: 'users'})

// const role = new Schema({
//     value: {
//         type: String,
//         default: 'USER'
//     }
// })



exports.users = model('users', users);
// exports.users = model('role', role);