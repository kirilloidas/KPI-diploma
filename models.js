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

const currentData = new Schema({
    data: {
        type: Array,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
}, {collection: 'currentData'})

const currentData1 = new Schema({
    data: {
        type: Array,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
}, {collection: 'currentData1'})

// module.exports = model('data', data);
// module.exports = model('users', users);
exports.dailyData = model('dailyData', dailyData);
exports.users = model('users', users);
exports.hourlyData = model('hourlyData', hourlyData);
exports.currentData = model('currentData', currentData);
exports.currentData1 = model('currentData1', currentData1);