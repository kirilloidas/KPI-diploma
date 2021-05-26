import {T_MIN_WATER, T_MAX_WATER, T_MIN_OUTSIDE, T_MAX_OUTSIDE, T_OUTSIDE, T_WATER, START_MODELING, POINTS_MODELING, TIME_MODELING} from '../types'

const initialState = {
    TMinWater: 70,
    TMaxWater: 95,
    TMinOutside: -20,
    TMaxOutside: 5,
    TOutside: -15,
    TWater: 0,
    start: false,
    points: [],
    time: []
}

export const modeling = (state = initialState, action) => {
    switch (action.type) {
        case T_MIN_WATER: 
            return {...state, TMinWater: action.payload}
        case T_MAX_WATER:
            return {...state, TMaxWater: action.payload}
        case T_MIN_OUTSIDE:
            return {...state, TMinOutside: action.payload}
        case T_MAX_OUTSIDE:
            return {...state, TMaxOutside: action.payload}
        case T_OUTSIDE:
            return {...state, TOutside: action.payload}
        case T_WATER:
            return {...state, TWater: action.payload}
        case START_MODELING:
            return {...state, start: action.payload}
        case POINTS_MODELING:
            return {...state, points: action.payload}
        case TIME_MODELING:
            return {...state, time: action.payload}
        default:
            return state
    }
}