const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
// const path = require('path');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const telegrafController = require('./telegraf/telegrafController')
const session = require('express-session')
const nodemailer = require('nodemailer')
const sendGrid = require('nodemailer-sendgrid-transport')
const sendExcelModule = require('./emails/sendExcelModule')
const key = require('./keys/keys');

const dailyData = require('./models/CounterData.js').dailyData;
// const users = require('./models/User.js').users;
const hourlyData = require('./models/CounterData.js').hourlyData;
const currentDataModel = require('./models/CounterData.js').currentData;
const currentDataModel1 = require('./models/CounterData.js').currentData1;

const mongoData = require('./mongo/mongoData')

// const setDataToFront = require('./data-processing/setDataToFront.js');

const authRouter = require('./authRouter');


const PORT = process.env.PORT || 5000;

const app = express();
const jsonParser = express.json();
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)

// app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/views/build'));
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false
}))

app.get('/*', function(req, res) {
    res.writeHead(200);
    // fs.readFile(__dirname + '/views/build/index.html')
    //     .then(page => res.end(page))
    res.sendFile(path.join(__dirname, 'views', 'build', 'index.html'));
})

// const transporter = nodemailer.createTransport(sendGrid({
//     auth: {
//         api_key: key.SENDGRID_API_KEY
//     }
// }))

app.post("/api/timeInterval", jsonParser, async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    // intervalTime = request.body;
    if (request.body.isDaily) {
        mongoData.getDataOfInterval(request.body, dailyData)
            .then(res => {
                response.end(JSON.stringify(res))
            });
    } else {
        mongoData.getDataOfInterval(request.body, hourlyData)
            .then(res => {
                response.end(JSON.stringify(res))
            });
    }

});

app.post('/api/currentData', jsonParser, function(request, response) {
    Promise.all([mongoData.getCurrentDataCounter1(currentDataModel), mongoData.getCurrentDataCounter1(currentDataModel1)]
        .map(p => p.catch(x => console.log(x)))).then(r => response.end(JSON.stringify(r)))
})

app.post('/api/downloadExcel', function (req, res, next) {
    res.download('./data.xlsx');        
});

app.post('/api/excelToMail', jsonParser, function (req, res) {
    console.log(req.body);
    console.log(req.body.mail)
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


// async function getCurrentDataCounter1(model) {
//     try {
//         let data = await model.findOne({});
//         return data;
//     } catch(e) {
//         console.log(e)
//     }
// }

// async function getCurrentDataCounter2(model) {
//     try {
//         let data = await model.find({});
//         return data;
//     } catch(e) {
//         console.log(e)
//     }
// }

// async function getDataOfInterval(dataFromFront, requestData) {
//     try {
//         let ourData = await requestData.find({
//             $and: [{
//                     "date": {
//                         $gte: dataFromFront.startTime
//                     }
//                 },
//                 {
//                     "date": {
//                         $lte: dataFromFront.endTime
//                     }
//                 }
//             ]

//         }).sort('field');
//         let responseData = ourData.sort(
//             function (a, b) {
//                 return a.date - b.date;
//             }
//         );
//         return setDataToFront.setDataSchedule(responseData, dataFromFront.switchCheckedObj);
//     } catch (error) {
//         console.log(error);
//     }
// }

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Kirill:kirill2000@cluster0.uyqia.mongodb.net/Cluster0', {
                    useNewUrlParser: true,
                    useFindAndModify: true,
                    useUnifiedTopology: true
                });
        app.listen(PORT, () => {
            telegrafController.controller()
            console.log(`Server has been started... ${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}

start();
