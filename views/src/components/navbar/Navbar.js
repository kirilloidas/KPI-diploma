import React, { useState } from 'react'
import {NavLink, Switch} from 'react-router-dom'
import HomeIcon from '../svg/SVGNavbar/homeIcon/HomeIcon'
import CounterIcon from '../svg/SVGNavbar/counterIcon/CounterIcon'
import AccessIcon from '../svg/SVGNavbar/accessIcon/AccessIcon'
import CustomizationIcon from '../svg/SVGNavbar/customizationIcon/CustomizationIcon'
import './Navbar.scss'

const Navbar = () => {

    const navList = [
        {name: '', path: '/', icon: <HomeIcon/>},
        {name: 'Лічильник 1', path: '/counter/1', icon: <CounterIcon/>},
        {name: 'Лічильник 2', path: '/counter/2', icon: <CounterIcon/>},
        {name: 'Лічильник 3', path: '/counter/3', icon: <CounterIcon/>},
        {name: 'Приватність', path: '/access', icon: <AccessIcon/>},
        {name: 'Налаштування', path: '/customization', icon: <CustomizationIcon/>}
    ];

    return (
        <div className="container-header">
            <div className="container-header-items">
                <div className="container-items">
                    {navList.map((context, index) => {
                        return (
                            <div className={index === 0 ? 'logo' : 'item'}>
                                <NavLink to={context.path} key={index} className='menu-item'>
                                    {context.icon}
                                    <div className="menu-text">
                                        {context.name}
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Navbar