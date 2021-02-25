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

exports.dailyData = model('dailyData', dailyData);
exports.hourlyData = model('hourlyData', hourlyData);