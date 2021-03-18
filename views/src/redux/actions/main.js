import {IS_CURRENT_DATA} from '../types'

export function setIsCurrentData(bool) {
    return{type: IS_CURRENT_DATA, payload: bool}
}