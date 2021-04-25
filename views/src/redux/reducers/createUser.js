import {CREATE_USER_NAME, CREATE_PASSWORD, CREATE_ROLE} from '../types'

const initialState = {
    userName: '',
    password: '',
    role: ''
}

export const createUser = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_NAME:
            return {...state, userName: action.payload}
        case CREATE_PASSWORD:
            return {...state, password: action.payload}
        case CREATE_ROLE:
            return {...state, role: action.payload}
        default:
            return state
    }
}