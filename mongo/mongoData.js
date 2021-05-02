const setDataToFront = require('../data-processing/setDataToFront.js');

class mongoData {
    async getDataOfInterval(dataFromFront, requestData) {
        console.log(dataFromFront)
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

    async getCurrentDataCounter1(model) {
        try {
            let data = await model.findOne({});
            return data;
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new mongoData()