const setDataToFront = require('../data-processing/setDataToFront.js');

class FindInMongo {
    constructor() {}

    static async getDataOfInterval(dataFromFront, requestData) {
        try {    
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

    static async authorizationUser(requestUser, users) {
        try {
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
}

module.exports = FindInMongo;