import React from 'react'
import './Authorization.scss'
import Button from '../../components/button/Button'
import InputAuth from '../../components/input/InputAuth'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import Timer from '../../components/timer/Timer'
import CapsBlock from '../../components/capsBlock/CapsBlock'

const Authorization = () => {

    return (
        <div className="Authorization">
            <h1 className="authorization_title">Авторизація</h1>
            <form action="/authorization" method="POST">
                <fieldset className="clearfix">
                    <Timer />
                    <InputAuth 
                        name = "Логін"
                    />
                    <InputAuth 
                        name = "Пароль"
                    />
                    <ReactIsCapsLockActive>
                     {active => active ? <CapsBlock/> : null}
                    </ReactIsCapsLockActive>
                    <Button text='Увійти'/>
                </fieldset>
            </form>
        </div>
        
    )
}

export default Authorization