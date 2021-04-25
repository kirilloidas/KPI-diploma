import {CREATE_USER_NAME, CREATE_PASSWORD, CREATE_ROLE} from '../types'

export function createUserName(name) {
    return {type: CREATE_USER_NAME, payload: name}
}

export function createPassword(pass) {
    return {type: CREATE_PASSWORD, payload: pass}
}

export function createRole(role) {
    return {type: CREATE_ROLE, payload: role}
}