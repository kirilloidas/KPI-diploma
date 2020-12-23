import {
    Initialization
} from './Initialization.js';
import {
    Schedule
} from './schedule.js';



let dataArr = [];


window.addEventListener('load', () => {
    async function init() {
        fetch('http://localhost:3000/api/data')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    let arrCo = [
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
          'rgba(153, 102, 255, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ];
    console.log(arrCo);
    

    btnSubmit.addEventListener('click', () => {
        for (let i = 0; i < ch.length; i++) {
            if (!ch[i].checked) {
                canv[i].style.display = 'none';
                // console.log(canv[i])
            } else {
                canv[i].style.display = 'block';
            }
        }
        let obj = {
            startTime: new Date(start_year.value, start_month.value, start_day.value).getTime(),
            endTime: new Date(end_year.value, end_month.value, end_day.value).getTime()
        };
        let json = JSON.stringify(obj);
        let request = new XMLHttpRequest();
            // посылаем запрос на адрес "/user"
             request.open("POST", "/timeInterval", true);   
             request.setRequestHeader("Content-Type", "application/json");
             request.addEventListener("load", function () {
                // получаем и парсим ответ сервера
                 let receivedObj = JSON.parse(request.response);
                //  console.log(receivedObj.startDay, "-", receivedObj.endDay);   // смотрим ответ сервера
             });
             request.send(json);

        setTimeout(() => {
            Initialization.initializationAjax();

        }, 2000);
    })


});