const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');

const authorization = require('./routes/authorization');
const counter1 = require('./routes/counter1');
const counter2 = require('./routes/counter2');
const counter3 = require('./routes/counter3');
const customization = require('./routes/customization');
const access = require('./routes/access');

const dailyData = require('./models.js').dailyData;
const users = require('./models.js').users;
const hourlyData = require('./models.js').hourlyData;

const setDataToFront = require('./data-processing/setDataToFront.js');


const PORT = process.env.PORT || 3000;

const app = express();
const workbook = new ExcelJS.Workbook();
const jsonParser = express.json();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/views'));

// Routers
app.use('/', authorization)
app.use('/index1', counter1)
app.use('/index2', counter2)
app.use('/index3', counter3)
app.use('/customization', customization)
app.use('/access', access)


var intervalTime;
app.post("/timeInterval", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    // response.json(request.body); // отправляем пришедший ответ обратно
    intervalTime = request.body;
    if(request.body.isDaily) {
        getDataOfInterval(request.body, dailyData)
            .then(res => {
                response.end(JSON.stringify(res))
            });
    } else {
        getDataOfInterval(request.body, hourlyData)
            .then(res => {
                response.end(JSON.stringify(res))
            });
    }
    
});

app.post("/authorization", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    authorizationUser(request.body)
        .then(res => {
            response.end(JSON.stringify(res))
        });

});



async function getDataOfInterval(intervalT, requestData) {
    try {
        await mongoose.connect('mongodb+srv://Kirill:kirill2000@cluster0.uyqia.mongodb.net/Cluster0', {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });

        let ourData = await requestData.find({
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
        let responseData = ourData.sort(
                    function(a,b){
                        return a.date-b.date;
                    }
                );
        return setDataToFront.setDataSchedule(responseData);
    } catch (error) {
        console.log(error);
    }
}



async function authorizationUser(requestUser) {
    try {
        await mongoose.connect('mongodb+srv://Kirill:kirill2000@cluster0.uyqia.mongodb.net/Cluster0', {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });

        let isUser = await users.findOne({
                    "login": {
                        $eq: requestUser.login
                    }
        });
        if(isUser == null || isUser.pass != requestUser.pass) {
            let obj = {
                isUser: false
            };
            return obj;
        } else {
            let obj = {
                isUser: true
            };
            return obj;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

app.listen(PORT, () => {
    console.log(`Server has been started...`);
    // start();
})