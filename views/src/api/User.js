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
    }
}