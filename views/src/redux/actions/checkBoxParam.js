import {CHECKBOX_OBJ, INTERVAL_OBJ, IS_DAILY, CHECKBOX_ITEM, DATA_TO_CHART, IS_DATA, IS_GET_CURRENT} from '../types'

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

export function setDataToChart(obj) {
    return {type: DATA_TO_CHART, payload: obj}
}

export function setIsData(bool) {
    return {type: IS_DATA, payload: bool}
}

export function setIsGetCurrent(bool) {
    return {type: IS_GET_CURRENT, payload: bool}
}