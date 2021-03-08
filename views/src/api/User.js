import {Api} from './Api'

export const User = {
    login(form) {
        return Api().post('/authorization', form)
    },
    getData(intervalObj) {
        return Api().post('/timeInterval', intervalObj)
    }
}