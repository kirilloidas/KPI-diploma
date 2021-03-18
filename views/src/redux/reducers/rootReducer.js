import { combineReducers } from "redux";
import { authReducer } from './auth'
import {checkBoxReducer } from './checkBoxParam'
import {mainReducer} from './main'

export const rootReducer = combineReducers({
    authReducer,
    checkBoxReducer,
    mainReducer
})