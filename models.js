const { Schema, model } = require('mongoose');

const dailyData = new Schema({
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

const hourlyData = new Schema({
    date: {
        type: Number,
        required: true
    },
    data:  {
        type: Array,
        required: true
    }    
}, {collection: 'hourlyArchive'})

// module.exports = model('data', data);
// module.exports = model('users', users);
exports.dailyData = model('dailyData', dailyData);
exports.users = model('users', users);
exports.hourlyData = model('hourlyData', hourlyData);