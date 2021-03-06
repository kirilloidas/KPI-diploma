import React from 'react'
import UserIcon from '../svg/UserIcon/UserIcon'
import PasswordIcon from '../svg/PasswordIcon/PasswordIcon'
import {connect} from 'react-redux'
import './Input.scss'
import { actionLogin, actionPass } from '../../redux/actions/auth'

const InputAuth = (props) => {

    const onChangeHandler = (event) => {
        switch (props.name) {
            case 'Логін':
                props.onSaveLogin(event.target.value)
                break;
            case 'Пароль':
                props.onSavePass(event.target.value)
            default:
                break;
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
        <React.Fragment>
            <p className="form-par">
                {whichInput()}
                <input type="text" placeholder={props.name}
                    onChange={(e) => {onChangeHandler(e); console.log(e.target.value)}}
                    onFocus={onFocusHandler} 
                    required />
            </p>
        </React.Fragment>
        
    )



}

const mapStateToProps = state => {
    return {
        login: state.authReducer.login,
        pass: state.authReducer.pass
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onSaveLogin: login => dispatch(actionLogin(login)),
        onSavePass: pass => dispatch(actionPass(pass))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputAuth)