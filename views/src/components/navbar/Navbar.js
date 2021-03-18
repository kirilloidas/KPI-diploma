import React, { useState } from 'react'
import {NavLink, Switch} from 'react-router-dom'
import HomeIcon from '../svg/SVGNavbar/homeIcon/HomeIcon'
import CounterIcon from '../svg/SVGNavbar/counterIcon/CounterIcon'
import AccessIcon from '../svg/SVGNavbar/accessIcon/AccessIcon'
import CustomizationIcon from '../svg/SVGNavbar/customizationIcon/CustomizationIcon'
import ChartIcon from '../svg/SVGNavbar/chart'
import LogoImg from '../../img/ntuukpi.png';
import {setIsCurrentData} from '../../redux/actions/main'
import './Navbar.scss'
import { connect } from 'react-redux'
// import svgChart from '../../img/svgChart.svg'
// import svgDashboard from '../../img/dashboard.svg'

const Navbar = ({setIsCurrentData}) => {

    const navList = [
        // {name: '', path: '/', icon: <HomeIcon/>},
        {name: 'Поточний', path: '/counter', icon: <ChartIcon/>},
        {name: 'Архів', path: '/counter', icon: <CounterIcon/>},
        {name: 'Приватність', path: '/access', icon: <AccessIcon/>},
        {name: 'Налаштування', path: '/customization', icon: <CustomizationIcon/>}
    ];

    const menuClickHandler = (item) => {
        if(item.name == 'Поточний') {
            setIsCurrentData(true)
        } else if(item.name == 'Архів') {
            setIsCurrentData(false)
        }
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
                            <li className='nav-list__item' onClick={() => menuClickHandler(context)}>
                                <span className='nav-list__item-icon'>{context.icon}</span>
                                <span className='nav-list__item-link'>{context.name}</span>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
        // <div className="container-header">
        //     <div className="container-header-items">
        //         <div className="container-items">
        //             {navList.map((context, index) => {
        //                 return (
        //                     <div className={index === 0 ? 'logo' : 'item'}>
        //                         <NavLink to={context.path} key={index} className='menu-item'>
        //                             {context.icon}
        //                             <div className="menu-text">
        //                                 {context.name}
        //                             </div>
        //                         </NavLink>
        //                     </div>
        //                 )
        //             })}
        //         </div>
        //     </div>
        // </div>
    )
}

const mapDispatchToProps = {
    setIsCurrentData
}

export default connect(null, mapDispatchToProps)(Navbar)