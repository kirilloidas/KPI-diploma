import {CHECKBOX_OBJ, INTERVAL_OBJ, IS_DAILY, CHECKBOX_ITEM, DATA_TO_CHART} from '../types'

const initialState = {
    checkBoxObj: {},
    intervalObj: {},
    isDaily: true,
    dataToChart: {}
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
        default:
            return state
    }
}