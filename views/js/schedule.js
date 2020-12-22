export class Schedule {
    constructor() {
        this._date,
        this._dataArr
    }

    static setDataSchedule(data) {
        let date = [];
        let dataArr = [];
        let a = 1;
        for(let i = 0; i < data.length - 1; i++) {
            date[i] = `${new Date(data[i].date).getDate()}:${new Date(data[i].date).getMonth()}:${new Date(data[i].date).getFullYear()}`;
        }
        for(let i = 0; i < 10; i++) {
            dataArr[i] = new Array(data.length);
            for(let j = 0; j < data.length; j++) {
                dataArr[i][j] = data[j].data[a].value;
            }
            a++;
            
        }
        this._date = date;
        this._dataArr = dataArr;
        // console.log(dataArr);
    }

    static getDataSchedule() {
        return this._dataArr;
    }

    static getDateSchedule() {
        return this._date;
    }

    static setSchedule() {
        let schedules = [schedule_1, schedule_2,schedule_3, schedule_4,schedule_5, schedule_6,schedule_7, schedule_8,schedule_9, schedule_10];
        let labels = ['Объем (масса) канала расхода 1', 'Значение температуры ТСП 1 * 100', 'Значение температуры ТСП 2 * 100', 'Тепло', 'Время работы счетчика , ч', 'Время ошибок', 'Введенные пользователем константы давления * 1000', 'Введенные пользователем константы давления * 1000', 'Потребленная энергия', 'Температура внутри корпуса'];
        for(let i = 0; i < schedules.length; i++) {
            var barChart = new Chart(schedules[i], {
                type: 'bar',
                data: {
                  labels: this.getDateSchedule(),
                  datasets: [{
                    label: labels[i],
                    data: this.getDataSchedule()[i],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)'
                    ]
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
                                fontSize: 16
                            }
                        }],
                        xAxes: [{
                            gridLines: { 
                                color: "#CCC"
                            },
                            ticks: {
                                fontColor: "#CCC",
                                fontSize: 16
                            }
                        }]
                    },
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            fontColor: 'blue',
                            fontSize: 20,
                            fontFamily: 'Helvetica'
                        }
                    }
                }
              });
        }
    }
}