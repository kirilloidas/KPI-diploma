import { Schedule } from './schedule.js';

export class Initialization {
    constructor(){

    }

    static initializationAjax() {
        fetch('http://localhost:3000/api/data')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            Schedule.setDataSchedule(data);
            Schedule.setSchedule();
        });
    }
}