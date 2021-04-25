import { combineReducers } from "redux";
import { authReducer } from './auth'
import {createUser} from './createUser'
import {checkBoxReducer } from './checkBoxParam'
import {mainReducer} from './main'

export const rootReducer = combineReducers({
    authReducer,
    checkBoxReducer,
    mainReducer,
    createUser
})