import { LOGIN, PASS } from "../types";

const initialState = {
    login: '',
    pass: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, login: action.payload}
        case PASS:
            return {...state, pass: action.payload}
        default:
            return state
    }
}