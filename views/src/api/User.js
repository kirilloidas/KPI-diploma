import {Api} from './Api'

export const User = {
    login(form) {
        console.log(form)
        return Api().post('/authorization', form)
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
    excelToMail() {
        return Api().post('/excelToMail');
    }
}