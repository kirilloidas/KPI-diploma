import React, { useState } from 'react'
import {NavLink, Switch, useHistory} from 'react-router-dom'
import HomeIcon from '../svg/SVGNavbar/homeIcon/HomeIcon'
import CounterIcon from '../svg/SVGNavbar/counterIcon/CounterIcon'
import AccessIcon from '../svg/SVGNavbar/accessIcon/AccessIcon'
import CustomizationIcon from '../svg/SVGNavbar/customizationIcon/CustomizationIcon'
import ChartIcon from '../svg/SVGNavbar/chart'
import MnemonicIcon from '../svg/SVGNavbar/mnemonic/MnemonicIcon';
import lineChartIcon from '../../img/line-chart.svg'
import ScheduleIcon from '../svg/SVGNavbar/schedules'
import LogoImg from '../../img/ntuukpi.png';
import {setIsCurrentData} from '../../redux/actions/main'
import './Navbar.scss'
import { connect } from 'react-redux'

const Navbar = ({setIsCurrentData}) => {
    const history = useHistory()

    const navList = [
        // {name: '', path: '/', icon: <HomeIcon/>},
        {name: 'Поточний', path: '/counter', icon: <ChartIcon/>},
        {name: 'Архів', path: '/counter', icon: <CounterIcon/>},
        {name: 'Приватність', path: '/access', icon: <AccessIcon/>},
        {name: 'Налаштування', path: '/customization', icon: <CustomizationIcon/>},
        {name: 'Мнемограма', path: '/mnemonicDiagram', icon: <MnemonicIcon/>},
        {name: 'Моделювання', path: '/schedules', icon: <ScheduleIcon/>}
    ];

    const menuClickHandler = (item, index) => {
        const path = navList[index].path;
        if(item.name == 'Поточний') {
            setIsCurrentData(true)
        } else if(item.name == 'Архів') {
            setIsCurrentData(false)
        }
        history.push(path);
        
    }

    return (
        <div className='NavBar'>
            <div className='logo-block'>
                <span className='logo-block__icon'>
                    <img src={LogoImg} alt='logo' />
                </span>
                <span className='logo-block__title'>KPI-Energy</span>
            </div>
            <nav className='list-block'>
                <ul className='nav-list'>
                    {navList.map((context, index) => {
                        return (
                            <li className='nav-list__item' onClick={() => {menuClickHandler(context, index)}} key={index}>
                                <span className='nav-list__item-icon'>{context.icon}</span>
                                <span className='nav-list__item-link'>{context.name}</span>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

const mapDispatchToProps = {
    setIsCurrentData
}

export default connect(null, mapDispatchToProps)(Navbar)