import {Api} from './Api'

export const User = {
    login(form) {
        console.log(form)
        return Api().post('/auth/login', form)
    },
    getData(intervalObj) {
        return Api().post('/timeInterval', intervalObj)
    },
    getCurrentData() {
        return Api().post('/currentData');
    },
    downloadExcel() {
        console.log('download')
        return Api().get('/downloadExcel');
    },
    excelToMail(mail) {
        // return Api().post('/excelToMail', JSON.stringify({mail: mail}));
        return Api().post('/excelToMail', {mail: mail});
    }
}