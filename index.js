const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// const telegramBot = require('./telegram-bot/telegram-bot');

const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const varMiddleware = require('./middleware/variables');

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

const dailyData = require('./models/data').dailyData;
const users = require('./models/users');
const hourlyData = require('./models/data').hourlyData;

const setDataToFront = require('./data-processing/setDataToFront.js');
const FindInMongo = require('./connectToMongo/findInMongo.js');

const PORT = process.env.PORT || 3000;

const app = express();
const jsonParser = express.json();

// const store = new MongoStore({
//     collection: 'sessions',
//     uri: key.MONGODB_URI
// })

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

// app.use(telegramBot);

// app.use(session({
//     secret: 'some secret value',
//     resave: false,
//     saveUninitialized: false,
//     store: store
// }))
// app.use(varMiddleware)

const transporter = nodemailer.createTransport(sendGrid({
    auth: {
        api_key: key.SENDGRID_API_KEY
    }
}))


app.post("/timeInterval", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    // response.json(request.body); // отправляем пришедший ответ обратно
    if (request.body.isDaily) {
        FindInMongo.getDataOfInterval(request.body, dailyData)
            .then(res => {
                response.end(JSON.stringify(res))
            });
    } else {
        FindInMongo.getDataOfInterval(request.body, hourlyData)
            .then(res => {
                response.end(JSON.stringify(res))
            });
    }

});

app.post("/authorization", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    FindInMongo.authorizationUser(request.body, users)
        .then(res => {
            response.end(JSON.stringify(res))
        });

});

app.get('/excel/download', function (req, res, next) {
    res.download('./data.xlsx');
});

app.post('/excel/sendToMail', jsonParser, function (req, res) {
    try {
        nodemailer.createTransport(sendGrid({
            auth: {
                api_key: key.SENDGRID_API_KEY
            }
        })).sendMail(sendExcelModule(req.body.mail))
        console.log(req.body.mail);
    } catch (error) {
        console.log(error)
    }


})



async function start() {
    try {
        await mongoose.connect(key.MONGODB_URI, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Server has been started...`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();