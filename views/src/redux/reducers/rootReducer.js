import { combineReducers } from "redux";
import { authReducer } from './auth'
import {checkBoxReducer } from './checkBoxParam'

export const rootReducer = combineReducers({
    authReducer,
    checkBoxReducer
})