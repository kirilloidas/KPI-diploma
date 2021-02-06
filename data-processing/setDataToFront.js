const excelData = require('./excelData.js');

class setDataToFront {
    constructor() {

    }

    static setDataSchedule(data) {
        let date = [];
        let dataArr = [];
        let dataId = [];
        let outputArray = new Object();
        let a = 1;
        for(let i = 0; i < data.length - 1; i++) {
            date[i] = `${new Date(data[i].date).getDate()}:${new Date(data[i].date).getMonth()}:${new Date(data[i].date).getFullYear()}:${new Date(data[i].date).getHours()}`;
        }
        for(let i = 0; i < 10; i++) {
            dataArr[i] = new Array(data.length);
            dataId[i] = new Array(data.length);
            for(let j = 0; j < data.length; j++) {
                if(data[j].data[a].id == 6
                    || data[j].data[a].id == 7
                    || data[j].data[a].id == 8
                    || data[j].data[a].id == 14) {
                        dataArr[i][j] = data[j].data[a].value / 100;
                } else if(data[j].data[a].id >= 44 && data[j].data[a].id <= 50) {
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
        outputArray.date = date;
        outputArray.dataArr = dataArr;
        outputArray.dataId = dataId;
        excelData.setExcel(outputArray);
        return outputArray;
    }
}
module.exports = setDataToFront;