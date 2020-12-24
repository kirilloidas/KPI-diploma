import { Schedule } from './schedule.js';

export class Initialization {
    constructor(){

    }

    static initializationAjax() {
        fetch('http://localhost:3000/api/data')
        .then(response => response.json())
        .then(data => {
            Schedule.setDataSchedule(data);
            Schedule.setSchedule();
        });
    }

    static initialozationInterval(obj) {
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
            this.initializationAjax();

        }, 2000);
    }

    static initializationUser(authorizationObj, model_block) {
        let json = JSON.stringify(authorizationObj);
        let request = new XMLHttpRequest();
            // посылаем запрос на адрес "/user"
             request.open("POST", "/authorization", true);   
             request.setRequestHeader("Content-Type", "application/json");
             request.addEventListener("load", function () {
                // получаем и парсим ответ сервера
                 let receivedObj = JSON.parse(request.response);

                 if(receivedObj.isUser) {
                     model_block.style.display = "none";
                 }
             });
             request.send(json);
    }
}