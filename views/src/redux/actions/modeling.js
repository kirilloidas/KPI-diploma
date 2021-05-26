import {T_MIN_WATER, T_MAX_WATER, T_MIN_OUTSIDE, T_MAX_OUTSIDE, T_OUTSIDE, T_WATER, START_MODELING, POINTS_MODELING, TIME_MODELING} from '../types'

export function actionTMinWater(value) {
    return {type: T_MIN_WATER, payload: value}
}

export function actionTMaxWater (value) {
    return {type: T_MAX_WATER, payload: value}
}

export function actionTMinOutside (value) {
    return {type: T_MIN_OUTSIDE, payload: value}
}

export function actionTMaxOutside (value) {
    return {type: T_MAX_OUTSIDE, payload: value}
}

export function actionTOutside (value) {
    return {type: T_OUTSIDE, payload: value}
}

export function actionTWater (value) {
    return {type: T_WATER, payload: value}
}

export function actionStartModeling (value) {
    return {type: START_MODELING, payload: value}
}

export function actionPointsModeling(value) {
    return {type: POINTS_MODELING, payload: value}
}

export function actionTimeModeling(value) {
    return {type: TIME_MODELING, payload: value}
}