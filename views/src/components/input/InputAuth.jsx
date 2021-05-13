import React from 'react'
import UserIcon from '../svg/UserIcon/UserIcon'
import PasswordIcon from '../svg/PasswordIcon/PasswordIcon'
import {connect} from 'react-redux'
import './Input.scss'
import { actionLogin, actionPass } from '../../redux/actions/auth'
import {createUserName, createPassword} from '../../redux/actions/createUser'

const InputAuth = (props) => {

    const onChangeHandler = (event) => {
        if(!!props.auth) {
            switch (props.name) {
                case 'Логін':
                    props.actionLogin(event.target.value)
                    break;
                case 'Пароль':
                    props.actionPass(event.target.value)
                default:
                    break;
            }
        } else {
            switch (props.name) {
                case 'Логін':
                    props.createUserName(event.target.value)
                    break;
                case 'Пароль':
                    props.createPassword(event.target.value)
                default:
                    break;
            }
        }
    }

    const onFocusHandler = (event) => {
        event.target.value = ''
    }

    const whichInput = () => {
        if (props.name === 'Логін') {
            return <UserIcon/>
        } else if (props.name === 'Пароль') {
            return <PasswordIcon/>
        }
    }


    return (
        <label className='input-label'>{!props.auth ? props.name : null}
            <p className="form-par">
                {whichInput()}
                <input type={props.type} placeholder={props.name}
                    onChange={(e) => {onChangeHandler(e)}}
                    onFocus={onFocusHandler} 
                    required />
            </p>
        </label>        
    )



}

const mapStateToProps = state => {
    return {
        login: state.authReducer.login,
        pass: state.authReducer.pass
    }
}


const mapDispatchToProps = {
    // return {
    //     onSaveLogin: login => dispatch(actionLogin(login)),
    //     onSavePass: pass => dispatch(actionPass(pass))
    // }
    actionLogin,
    actionPass,
    createUserName,
    createPassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputAuth)