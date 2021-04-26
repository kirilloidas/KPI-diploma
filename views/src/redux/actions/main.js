import {IS_CURRENT_DATA, CURRENT_DATA, IS_ERROR, MODAL_MESSAGE} from '../types'

export function setIsError(bool) {
    return {type: IS_ERROR, payload: bool}
}

export function setModalMessage(message) {
    return {type: MODAL_MESSAGE, payload: message}
}

export function setIsCurrentData(bool) {
    return{type: IS_CURRENT_DATA, payload: bool}
}

export function getCurrentData(obj) {
    return {type: CURRENT_DATA, payload: obj}
}