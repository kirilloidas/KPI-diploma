const ch = document.querySelectorAll('.checkbox input[type="checkbox"]');
const canv = document.querySelectorAll('canvas');
const btnSubmit = document.getElementById('submit');
const btnAuthorization = document.getElementById('authorization');
const modal_block = document.getElementById('modal_block');
const checkbox_switch = document.querySelectorAll('.switch_schedule #checkbox_switch');

const schedule_1 = document.getElementById("schedule_1");
const schedule_2 = document.getElementById("schedule_2");
const schedule_3 = document.getElementById("schedule_3");
const schedule_4 = document.getElementById("schedule_4");
const schedule_5 = document.getElementById("schedule_5");
const schedule_6 = document.getElementById("schedule_6");
const schedule_7 = document.getElementById("schedule_7");
const schedule_8 = document.getElementById("schedule_8");
const schedule_9 = document.getElementById("schedule_9");
const schedule_10 = document.getElementById("schedule_10");

const start_day = document.getElementById('start_day');
const start_month = document.getElementById('start_month');
const start_year = document.getElementById('start_year');
const start_hours = document.getElementById('start_hours');
const end_day = document.getElementById('end_day');
const end_month = document.getElementById('end_month');
const end_year = document.getElementById('end_year');
const end_hours = document.getElementById('end_hours');

const interval_error = document.getElementsByClassName('interval_error');
const start_day_error = document.getElementById('start_day_error');
const start_month_error = document.getElementById('start_month_error');
const start_year_error = document.getElementById('start_year_error');
const start_hours_error = document.getElementById('start_hours_error');
const end_day_error = document.getElementById('end_day_error');
const end_month_error = document.getElementById('end_month_error');
const end_year_error = document.getElementById('end_year_error');
const end_hours_error = document.getElementById('end_hours_error');
// const downloadExcel = document.getElementById('downloadExcel');
const modalBlock_mail = document.getElementById('modalBlock-mail');
const excelToMail = document.getElementById('excelToMail');
const modalBlock = document.getElementById('modalBlock');
const closeModalBlock = document.getElementById('closeModalBlock');

const login = document.getElementById('login');
const password = document.getElementById('password');
const capsLock = document.getElementById('capsLock');
const error_authorization = document.getElementById('error_authorization');

