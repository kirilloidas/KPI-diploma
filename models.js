const { Schema, model } = require('mongoose');

const data = new Schema({
    date: {
        type: Number,
        required: true
    },
    data:  {
        type: Array,
        required: true
    }    
}, {collection: 'dailyArchive'})


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

// module.exports = model('data', data);
module.exports = model('users', users);