const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


class connectMongo {
    constructor() {

    }

    static async getDataOfInterval(intervalT, data) {
        try {
            await mongoose.connect('mongodb+srv://Kirill:kirill2000@cluster0.uyqia.mongodb.net/Cluster0', {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true
            });
    
            let ourData = await data.find({
                $and: [{
                        "date": {
                            $gte: intervalT.startTime
                        }
                    },
                    {
                        "date": {
                            $lte: intervalT.endTime
                        }
                    }
                ]
    
            }).sort('field');
            console.log(ourData);
            app.get('/api/data', (req, res) => {
                res.status(200);
                res.end(JSON.stringify(ourData));
            })
        } catch (error) {
            console.log(error);
        }
    }
}

// exports.connectMongo = connectMongo;
module.exports = connectMongo;