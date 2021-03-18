import {IS_CURRENT_DATA} from '../types';

const initialState = {
    isCurrent: false
}

export const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_CURRENT_DATA:
            return {...state, isCurrent: action.payload}
        default:
            return state;
    }
}