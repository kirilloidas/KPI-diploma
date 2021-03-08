import { LOGIN, PASS } from "../types";

export function actionLogin (login) {
    return {type: LOGIN, payload: login}
}

export function actionPass (pass) {
    return {type: PASS, payload: pass}
}