import React, { useState, useEffect } from 'react'
import './Authorization.scss'
import Button from '../../components/button/Button'
import InputAuth from '../../components/input/InputAuth'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import Timer from '../../components/timer/Timer'
import CapsBlock from '../../components/capsBlock/CapsBlock'
import {User} from '../../api/User'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'

const Authorization = ({login, pass}) => {
    const history = useHistory()
    const [isUser, setIsUser] = useState(false);
    const [isCorrent, setIsCorrect] = useState(true);

    const submitHandler = () => {
        User.login({username: login, password: pass})
            .then(res => {
                sessionStorage.setItem('token', res.data.token)
                history.push('/counter')
            })
    }
    return (
        <div className="Authorization">
            <h1 className="authorization_title">Авторизація</h1>
            <form action="/authorization" method="POST">
                <fieldset className="clearfix">
                    <InputAuth 
                        name = "Логін"
                    />
                    <InputAuth 
                        name = "Пароль"
                    />
                    <ReactIsCapsLockActive>
                     {active => active ? <CapsBlock/> : null}
                    </ReactIsCapsLockActive>
                    {isCorrent ? null : <p style={{color:'red'}}>Логін чи пароль вказані невірно</p>}
                    <Button text='Увійти' onClick={() => submitHandler()}/>
                </fieldset>
            </form>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        login: state.authReducer.login,
        pass: state.authReducer.pass
    }
}

export default connect(mapStateToProps, null)(Authorization)