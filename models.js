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

module.exports = model('data', data);