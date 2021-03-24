import {CHECKBOX_OBJ, INTERVAL_OBJ, IS_DAILY, CHECKBOX_ITEM, DATA_TO_CHART, IS_DATA, IS_GET_CURRENT, PARAM_OPRION, TIME_OBJ, START_TIME, END_TIME, CURRENT_PARAM_OPTION} from '../types'

export function setCheckBoxObj(obj) {
    return {type: CHECKBOX_OBJ, payload: obj}
}

export function setCheckBoxItem(key, value) {
    return {type: CHECKBOX_ITEM, payloadKey: key, payloadValue: value}
}

export function setIntervalObj(obj) {
    console.log(obj)
    return {type: INTERVAL_OBJ, payload: obj}
}

export function setTimeObj(obj) {
    return {type: TIME_OBJ, payload: obj}
}

export function setStartTimeAction(time) {
    return {type: START_TIME, payload: time}
}

export function setEndTimeAction(time) {
    return {type: END_TIME, payload: time}
}

export function setIsDaily(bool) {
    return {type: IS_DAILY, payload: bool}
}

export function setDataToChart(obj) {
    console.log(obj)
    return {type: DATA_TO_CHART, payload: obj}
}

export function setIsData(bool) {
    return {type: IS_DATA, payload: bool}
}

export function setIsGetCurrent(bool) {
    return {type: IS_GET_CURRENT, payload: bool}
}

export function setParamOption(value) {
    return {type: PARAM_OPRION, payload: value}
}

export function setCurrentParamOption(value) {
    return {type: CURRENT_PARAM_OPTION, payload: value}
}