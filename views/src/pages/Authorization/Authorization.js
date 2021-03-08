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
    const [isUser, setIsUser] = useState();

    const submitHandler = () => {
        // console.log(window.location.origin)
        User.login({login: login, pass:pass})
            .then(data => setIsUser(data.data.isUser))
        // fetch('/api/authorization', {method: 'POST', body: JSON.stringify({login: login, pass:pass})})
    }

    useEffect(() => {
        if(isUser) {
            history.push('counter/1')
        }
    }, [isUser])

    return (
        <div className="Authorization">
            <h1 className="authorization_title">Авторизація</h1>
            <form action="/authorization" method="POST">
                <fieldset className="clearfix">
                    {/* <Timer /> */}
                    <InputAuth 
                        name = "Логін"
                    />
                    <InputAuth 
                        name = "Пароль"
                    />
                    <ReactIsCapsLockActive>
                     {active => active ? <CapsBlock/> : null}
                    </ReactIsCapsLockActive>
                    {!isUser ? <p style={{color:'red'}}>Логін чи пароль вказані невірно</p> : null}
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