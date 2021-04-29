import {IS_CURRENT_DATA, CURRENT_DATA, IS_ERROR, MODAL_MESSAGE} from '../types';

const initialState = {
    isCurrent: false,
    currentData: {},
    isError: false,
    modalMessage: ''
}

export const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_CURRENT_DATA:
            return {...state, isCurrent: action.payload}
        case CURRENT_DATA:
            return {...state, currentData: action.payload}
        case IS_ERROR:
            return {...state, isError: action.payload}
        case MODAL_MESSAGE: 
            return {...state, modalMessage: action.payload}           
        default:
            return state;
    }
}