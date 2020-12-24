const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
let bodyParser = require('body-parser');
// const Routes = require('./router.js');
// const users = require('./models.js')
// const data = require('./models.js');
const data = require('./models.js').data;
const users = require('./models.js').users;


const PORT = process.env.PORT || 3000;

let app = express();
let jsonParser = express.json();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/views'));


app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

var intervalTime;
app.post("/timeInterval", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    response.json(request.body); // отправляем пришедший ответ обратно
    intervalTime = request.body;
    console.log(intervalTime);
    start(intervalTime);
});

app.post("/authorization", jsonParser, function (request, response) {
    console.log(request.body);
    if (!request.body) return response.sendStatus(400);
    authorizationUser(request.body)
        .then(res => {
            response.end(JSON.stringify(res))
        });

});



async function start(intervalT) {
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
app.listen(PORT, () => {
    console.log(`Server has been started...`);
    // start();
})