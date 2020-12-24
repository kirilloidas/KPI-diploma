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
        Initialization.initialozationInterval(obj);
    });

    btnAuthorization.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(login.value, password.value);
        let authorizationObj = {
            login: login.value,
            pass: password.value
        };
        Initialization.initializationUser(authorizationObj, modal_block);
    })

    // console.log(checkbox_switch);
    checkbox_switch[0].addEventListener('click', () => {
        console.log(checkbox_switch[0].checked)
        if(checkbox_switch[0].checked) {
            start_hours.classList.add('input_time_show');
            end_hours.classList.add('input_time_show');
        } else {
            start_hours.classList.remove('input_time_show');
            end_hours.classList.remove('input_time_show');
        }
    })
    


});