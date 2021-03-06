import {CHECKBOX_OBJ, INTERVAL_OBJ, IS_DAILY, CHECKBOX_ITEM} from '../types'

export function setCheckBoxObj(obj) {
    return {type: CHECKBOX_OBJ, payload: obj}
}

export function setCheckBoxItem(key, value) {
    return {type: CHECKBOX_ITEM, payloadKey: key, payloadValue: value}
}

export function setIntervalObj(obj) {
    return {type: INTERVAL_OBJ, payload: obj}
}

export function setIsDaily(bool) {
    return {type: IS_DAILY, payload: bool}
}