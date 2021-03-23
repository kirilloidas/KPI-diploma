const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const {
    Telegraf,
    Markup
} = require("telegraf");

const authorization = require('./routes/authorization');
const counter1 = require('./routes/counter1');
const counter2 = require('./routes/counter2');
const counter3 = require('./routes/counter3');
const customization = require('./routes/customization');
const access = require('./routes/access');

const nodemailer = require('nodemailer')
const sendGrid = require('nodemailer-sendgrid-transport')
const sendExcelModule = require('./emails/sendExcelModule')
const key = require('./keys/keys');

const dailyData = require('./models.js').dailyData;
const users = require('./models.js').users;
const hourlyData = require('./models.js').hourlyData;
const currentDataModel = require('./models.js').currentData;
const currentDataModel1 = require('./models.js').currentData1;

const setDataToFront = require('./data-processing/setDataToFront.js');


const PORT = process.env.PORT || 5000;

const app = express();
const jsonParser = express.json();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())

app.use(express.static(__dirname + '/views'));

// Routers
// app.use('/', authorization)
// app.use('/index1', counter1)
// app.use('/index2', counter2)
// app.use('/index3', counter3)
// app.use('/customization', customization)
// app.use('/access', access)

const transporter = nodemailer.createTransport(sendGrid({
    auth: {
        api_key: key.SENDGRID_API_KEY
    }
}))


var intervalTime;
app.post("/api/timeInterval", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    // response.json(request.body); // отправляем пришедший ответ обратно
    intervalTime = request.body;
    if (request.body.isDaily) {
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

app.post('/api/currentData', jsonParser, function(request, response) {
    let currentObj = new Object();
    // getCurrentDataCounter1(currentDataModel)
    //     .then(res => {
    //         currentObj.first = res;
    //     })
    //  getCurrentDataCounter1(currentDataModel1)
    //     .then(res => {
    //         currentObj.second = res;
    //     })
    Promise.all([getCurrentDataCounter1(currentDataModel), getCurrentDataCounter1(currentDataModel1)]
        .map(p => p.catch(x => console.log(x)))).then(r => response.end(JSON.stringify(r)))
    // setInterval(() => {
    //     if(currentObj.first && currentObj.second) {
    //         response.end(JSON.stringify(currentObj))
    //         clearInterval();
    //     }
    // }, 200);
})


app.post("/api/authorization", function (request, response) {
    if (!request.body) return response.sendStatus(400);
    authorizationUser(request.body)
        .then(res => {
            response.end(JSON.stringify(res))
        });

});

app.get('/api/downloadExcel', function (req, res, next) {
    console.log('yes');
    // var filePath = "../"; // Or format the path using the `id` rest param
    // var fileName = "data.xlsx"; // The default name the browser will use

    res.download('./data.xlsx');
    // fs.createReadStream('./data.xlsx').pipe(res);
});

app.post('/api/excelToMail', jsonParser, function (req, res) {
    console.log('email')
    try {
        nodemailer.createTransport(sendGrid({
            auth: {
                api_key: key.SENDGRID_API_KEY
            }
        })).sendMail(sendExcelModule(req.body.mail))
    } catch (error) {
        console.log(error)
    }


})


async function getCurrentDataCounter1(model) {
    try {
        await mongoose.connect('mongodb+srv://Kirill:kirill2000@cluster0.uyqia.mongodb.net/Cluster0', {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });

        let data = await model.findOne({});
        return data;
    } catch(e) {
        console.log(e)
    }
}

async function getCurrentDataCounter2(model) {
    try {
        await mongoose.connect('mongodb+srv://Kirill:kirill2000@cluster0.uyqia.mongodb.net/Cluster0', {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });

        let data = await model.find({});
        return data;
    } catch(e) {
        console.log(e)
    }
}



async function getDataOfInterval(dataFromFront, requestData) {
    try {
        await mongoose.connect('mongodb+srv://Kirill:kirill2000@cluster0.uyqia.mongodb.net/Cluster0', {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });

        let ourData = await requestData.find({
            $and: [{
                    "date": {
                        $gte: dataFromFront.startTime
                    }
                },
                {
                    "date": {
                        $lte: dataFromFront.endTime
                    }
                }
            ]

        }).sort('field');
        let responseData = ourData.sort(
            function (a, b) {
                return a.date - b.date;
            }
        );
        return setDataToFront.setDataSchedule(responseData, dataFromFront.switchCheckedObj);
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
        if (isUser == null || isUser.pass != requestUser.pass) {
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







// const bot = new Telegraf("1605090343:AAGp3XULDmenK3BPWxVU4B6tDN26efM-95M");

// // Обработчик начала диалога с ботом
// bot.start((ctx) =>
//     ctx.reply(
//         `Приветствую, ${
//        ctx.from.first_name ? ctx.from.first_name : "хороший человек"
//     }! Набери /getFile и получи свой файл`
//     ))


// // Обработчик команды /help
// // bot.help((ctx) => ctx.reply("Справка в процессе"));
// bot.command("getFile", (ctx) => {
//     ctx.replyWithDocument({ source: './data.xlsx'})
// })

// // Запуск бота
// bot.launch();


app.listen(PORT, () => {
    console.log(`Server has been started...`);
    // start();
})