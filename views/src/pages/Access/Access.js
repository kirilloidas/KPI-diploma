import React, { useState } from 'react'
import NavBar from '../../components/navbar/Navbar';
import InputAuth from '../../components/input/InputAuth';
import CustomSelect from '../../components/input/CustomSelect'
import './Access.scss'
import { connect } from 'react-redux';
import {User} from '../../api/User'

const Access = (props) => {

    const createUser = () => {
        User.registration(props.userName, props.password, props.role)
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <React.Fragment>
            <h1 className='access-title'>Access</h1>
            <div className='create-user-block'>
                <h2 className='create-user-block__title'>
                    Строрення нового користувача
                </h2>
                <div className='create-user-block__options'>
                    <InputAuth name="Логін" type='text' auth = {false} />
                    <InputAuth name="Пароль" type='password' auth = {false} />
                    <CustomSelect/>
                </div>
                <div className='create-user-block__buttons'>
                    <span className='create-user-block__create-btn' onClick={() => (createUser())}>Створити</span>
                </div>
            </div>
            <NavBar />
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        userName: state.createUser.userName,
        password: state.createUser.password,
        role: state.createUser.role,
    }
}

export default connect(mapStateToProps, null)(Access)