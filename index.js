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
    console.log(intervalTime);
    // connectMongo.getDataOfInterval(intervalTime, data);
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
    console.log(request.body);
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
        return setDataSchedule(responseData);
        // return responseData;
    } catch (error) {
        console.log(error);
    }
}



async function authorizationUser(requestUser) {
    console.log('auto')
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
        // console.log(isUser, '10');
        if(isUser == null || isUser.pass != requestUser.pass) {
            // console.log('false');
            let obj = {
                isUser: false
            };
            return obj;
        } else {
            // console.log('true');
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



async function setDataSchedule(data) {
    // console.log(data);
    let date = [];
    let dataArr = [];
    let dataId = [];
    let outputArray = [];
    let a = 1;
    for(let i = 0; i < data.length - 1; i++) {
        date[i] = `${new Date(data[i].date).getDate()}:${new Date(data[i].date).getMonth()}:${new Date(data[i].date).getFullYear()}:${new Date(data[i].date).getHours()}`;
    }
    for(let i = 0; i < 10; i++) {
        dataArr[i] = new Array(data.length);
        dataId[i] = new Array(data.length);
        for(let j = 0; j < data.length; j++) {
            // console.log(data[j].data[a]);
            if(data[j].data[a].id == 6
                || data[j].data[a].id == 7
                || data[j].data[a].id == 8
                || data[j].data[a].id == 14) {
                    // console.log('67814');
                    dataArr[i][j] = data[j].data[a].value / 100;
            } else if(data[j].data[a].id >= 44 && data[j].data[a].id <= 50) {
                // console.log('44')
                dataArr[i][j] = data[j].data[a].value / 1000;
            }else if(data[j].data[a].id >= 23 && data[j].data[a].id <= 25 ) {
                dataArr[i][j] = data[j].data[a].value / 3600;
            } else {
                dataArr[i][j] = data[j].data[a].value;
            }
            dataId[i][j] = data[j].data[a].id;
        }
        a++;
        
    }
    outputArray[0] = date;
    outputArray[1] = dataArr;
    outputArray[2] = dataId;
    return outputArray;
    // console.log(dataArr);
}


workbook.xlsx.readFile("data.xlsx").then(function () {

    //Get sheet by Name
    var worksheet=workbook.getWorksheet('Лист1');

    //Get Lastrow
    var row = worksheet.lastRow


    // const fakeData =  {
    //     address: "well st",
    //     description: "180036710",
    //     fromTotal: 1.365
    //   };

    const fakeData = ['hello', 'yes', 'no'];

    //Update a cell
    // row.getCell(1).value = 5; 

    // row.commit(); 

    worksheet.addRow(fakeData).commit();

    //Save the workbook
    return workbook.xlsx.writeFile("data.xlsx");

});




app.listen(PORT, () => {
    console.log(`Server has been started...`);
    // start();
})