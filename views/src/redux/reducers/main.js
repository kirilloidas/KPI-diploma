import {IS_CURRENT_DATA, CURRENT_DATA} from '../types';

const initialState = {
    isCurrent: false,
    currentData: {}
}

export const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_CURRENT_DATA:
            return {...state, isCurrent: action.payload}
        case CURRENT_DATA:
            return {...state, currentData: action.payload}
        default:
            return state;
    }
}