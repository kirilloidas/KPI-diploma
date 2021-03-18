import {IS_CURRENT_DATA, CURRENT_DATA} from '../types'

export function setIsCurrentData(bool) {
    return{type: IS_CURRENT_DATA, payload: bool}
}

export function getCurrentData(obj) {
    console.log(obj)
    return {type: CURRENT_DATA, payload: obj}
}