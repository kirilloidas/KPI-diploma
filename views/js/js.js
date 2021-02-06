import {
    Initialization
} from './Initialization.js';
import {
    Schedule
} from './schedule.js';

window.addEventListener('load', () => {
    // async function init() {
    //     fetch('http://localhost:3000/api/data')
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    // }
    let isDateTrue;    

    btnSubmit.addEventListener('click', () => {
        // console.log(checkbox_switch[0].checked);
        let switchCheckedObj = new Object();
        for (let i = 0; i < ch.length; i++) {
            switchCheckedObj[i] = ch[i].checked;
            if (!ch[i].checked) {
                canv[i].style.display = 'none';
            } else {
                canv[i].style.display = 'block';
            }
        }
        console.log(switchCheckedObj);
        let obj = {
            startTime: new Date(start_year.value, start_month.value, start_day.value, start_hours.value || 0).getTime(),
            endTime: new Date(end_year.value, end_month.value, end_day.value, end_hours.value || 0).getTime(),
            switchCheckedObj: switchCheckedObj
        };
        if(checkbox_switch[0].checked) {
            obj.isDaily = false;
        } else {
            obj.isDaily = true;
        }
        for(let i = 0; i < interval_error.length; i++) {
            if(interval_error[i].style.display == "none") {
                isDateTrue = true;
            } else if(interval_error[i].style.display == undefined || interval_error[i].style.display == null){
                isDateTrue = false;
                break;
            }
        }
        if(isDateTrue) {
            Initialization.initialozationInterval(obj);
        }
    });

    checkbox_switch[0].addEventListener('click', () => {
        if(checkbox_switch[0].checked) {
            start_hours.classList.add('input_time_show');
            end_hours.classList.add('input_time_show');
        } else {
            start_hours.classList.remove('input_time_show');
            end_hours.classList.remove('input_time_show');
        }
    })

    start_day.addEventListener('blur', () => {
        if(start_day.value <= 0 || start_day.value >= 32) {
            start_day_error.style.display = 'block';
        } else {
            start_day_error.style.display = 'none';
        }
    })

    start_month.addEventListener('blur', () => {
        if(start_month.value <= 0 || start_month.value >= 13) {
            start_month_error.style.display = 'block';
        } else {
            start_month_error.style.display = 'none';
        }
    })

    start_year.addEventListener('blur', () => {
        let yearNow = new Date().getFullYear();
        if(start_year.value <= 2019 || start_year.value > yearNow) {
            start_year_error.style.display = 'block';
        } else {
            start_year_error.style.display = 'none';
        }
    })

    start_hours.addEventListener('blur', () => {
        if(start_hours.value < 0 || start_hours.value >= 24) {
            start_hours_error.style.display = 'block';
        } else {
            start_hours_error.style.display = 'none';
        }
    })

    end_day.addEventListener('blur', () => {
        if(end_day.value <= 0 || end_day.value >= 32) {
            end_day_error.style.display = 'block';
        } else {
            end_day_error.style.display = 'none';
        }
    })

    end_month.addEventListener('blur', () => {
        if(end_month.value <= 0 || end_month.value >= 13) {
            end_month_error.style.display = 'block';
        } else {
            end_month_error.style.display = 'none';
        }
    })

    end_year.addEventListener('blur', () => {
        let yearNow = new Date().getFullYear();
        if(end_year.value <= 2019 || end_year.value > yearNow) {
            end_year_error.style.display = 'block';
        } else {
            end_year_error.style.display = 'none';
        }
    })

    end_hours.addEventListener('blur', () => {
        if(end_hours.value < 0 || end_hours.value >= 24) {
            end_hours_error.style.display = 'block';
        } else {
            end_hours_error.style.display = 'none';
        }
    })
    
    downloadExcel.addEventListener('click', (e) => {
        e.preventDefault();
        modalBlock.style.display = 'flex';
        modalBlock.style.justifyContent = 'center';
        modalBlock.style.alignItems = 'center';
    })

    closeModalBlock.addEventListener('click', () => {
        modalBlock.style.display = 'none';
    })

    excelToMail.addEventListener('click', (e) => {
        // e.preventDefault()
        let obj = {
            mail: modalBlock_mail.value
        };
        Initialization.excelToMail(obj);
    })

});