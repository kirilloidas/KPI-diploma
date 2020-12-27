export class Schedule {
    constructor() {
        this._date,
        this._dataArr,
        this._dataId
    }

    static setDataSchedule(data) {
        console.log(data);
        let date = [];
        let dataArr = [];
        let dataId = [];
        let a = 1;
        for(let i = 0; i < data.length - 1; i++) {
            date[i] = `${new Date(data[i].date).getDate()}:${new Date(data[i].date).getMonth()}:${new Date(data[i].date).getFullYear()}:${new Date(data[i].date).getHours()}`;
        }
        for(let i = 0; i < 10; i++) {
            dataArr[i] = new Array(data.length);
            dataId[i] = new Array(data.length);
            for(let j = 0; j < data.length; j++) {
                console.log(data[j].data[a]);
                dataArr[i][j] = data[j].data[a].value;
                dataId[i][j] = data[j].data[a].id;
            }
            a++;
            
        }
        this._date = date;
        this._dataArr = dataArr;
        this._dataId = dataId;
        console.log(this._dataId);
        // console.log(dataArr);
    }

    static getDataSchedule() {
        return this._dataArr;
    }

    static getDateSchedule() {
        return this._date;
    }

    static getIdSchedule() {
        return this._dataId;
    }

    static getColorSchedule(n) {
        let arrColors = [];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
          
          let red = getRandomInt(255);
          let green = getRandomInt(255);
          let blue = getRandomInt(255);

              arrColors = "rgb(" + red + "," + green + "," + blue + ")";
          console.log(arrColors);
        return arrColors;
    }

    static setSchedule() {
        let schedules = [schedule_1, schedule_2,schedule_3, schedule_4,schedule_5, schedule_6,schedule_7, schedule_8,schedule_9, schedule_10];
        let labels = ['Об`єм (маса) каналу витрати 1', 'Значення температури ТСП 1 * 100', 'Значення температури ТСП 2 * 100', 'Тепло', 'Час роботи лічильника, год', 'Час помилок', 'Введені користувачем константи тиску * 1000', 'Введені користувачем константи тиску * 1000', 'Спожита енергія', 'Температура всередині корпусу'];
        let typeOfSchedule,
            bgColorOfSchedule,
            borderColorSchedule;
        for(let i = 0; i < schedules.length; i++) {
            if(this.getIdSchedule()[i][0] == 6
                || this.getIdSchedule()[i][0] == 7
                || this.getIdSchedule()[i][0] == 8
                || this.getIdSchedule()[i][0] == 14
                || this.getIdSchedule()[i][0] == 55) {
                    typeOfSchedule = 'line';
                    bgColorOfSchedule = undefined;
                    borderColorSchedule = 'yellow';
                }
            else {
                typeOfSchedule = 'bar';
                bgColorOfSchedule = this.getColorSchedule(this.getDateSchedule().length);
                borderColorSchedule = undefined;
            }
            var barChart = new Chart(schedules[i], {
                type: typeOfSchedule,
                data: {
                  labels: this.getDateSchedule(),
                  datasets: [{
                    label: labels[i],
                    data: this.getDataSchedule()[i],
                    // backgroundColor: this.getColorSchedule(this.getDateSchedule().length)
                    backgroundColor: bgColorOfSchedule,
                    borderColor: borderColorSchedule
                  }]
                },
                options: {
                    // All of my other bar chart option here
                    scales: {
                        yAxes: [{
                            gridLines: { 
                                color: "#CCC" 
                            },
                            ticks: {
                                beginAtZero:true,
                                fontColor: "#CCC",
                                fontSize: 28
                            }
                        }],
                        xAxes: [{
                            gridLines: { 
                                color: "#CCC"
                            },
                            ticks: {
                                fontColor: "#CCC",
                                fontSize: 28
                            }
                        }]
                    },
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            fontColor: 'blue',
                            fontSize: 40,
                            fontFamily: 'Helvetica'
                        }
                    }
                }
            });
        }
    }
}