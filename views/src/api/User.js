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
        return Api().post('/downloadExcel');
    },
    excelToMail(mail) {
        // return Api().post('/excelToMail', JSON.stringify({mail: mail}));
        return Api().post('/excelToMail', {mail: mail});
    },
    registration(username, password, role) {
        console.log(username, password, role)
        // return Api().post('/auth/registration', JSON.stringify({form: form, token: sessionStorage.getItem('token')}))
        return Api().post('/auth/registration', {token: sessionStorage.getItem('token'), username: username, password, password, role: role})
    }
}