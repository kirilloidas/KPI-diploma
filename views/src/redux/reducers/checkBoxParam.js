import {CHECKBOX_OBJ, INTERVAL_OBJ, IS_DAILY, CHECKBOX_ITEM, DATA_TO_CHART, IS_DATA, IS_GET_CURRENT, PARAM_OPRION, TIME_OBJ, START_TIME, END_TIME} from '../types'

const initialState = {
    checkBoxObj: {},
    intervalObj: {},
    timeObj: {},
    startTime: '',
    endTime: '',
    isDaily: true,
    dataToChart: {},
    isData: false,
    isGetCurrent: false,
    paramOption: undefined
};

export const checkBoxReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHECKBOX_OBJ:
            return {...state, checkBoxObj: action.payload}
        case CHECKBOX_ITEM: {
            let newObj = {};
            for (let item in state.checkBoxObj) {
                if(item == action.payloadKey) {
                    newObj[item] = action.payloadValue
                } else {
                    newObj[item] = state.checkBoxObj[item]
                }
            }
            return {...state, checkBoxObj: newObj}
        }
        case INTERVAL_OBJ:
            return {...state, intervalObj: action.payload}
        case IS_DAILY:
            return {...state, isDaily: action.payload}
        case DATA_TO_CHART: 
            return {...state, dataToChart: action.payload}
        case IS_DATA:
            return{...state, isData: action.payload}
        case IS_GET_CURRENT:
            return {...state, isGetCurrent: action.payload}
        case PARAM_OPRION:
            return {...state, paramOption: action.payload}
        case TIME_OBJ:
            return {...state, timeObj: action.payload}
        case START_TIME: 
            return {...state, startTime: action.payload}
        case END_TIME:
            return {...state, endTime: action.payload}
        default:
            return state
    }
}