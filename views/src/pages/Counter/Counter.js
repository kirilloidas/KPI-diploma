import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import CheckMode from "../../components/checkbox/CheckMode";
import CheckOptions from '../../components/checkbox/CheckOptions';
import OptionsBlock from '../../components/optionsBlock/OptionsBlock'
import ChartData from '../../components/charts/Chart'

const Counter = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <OptionsBlock/>
            <ChartData/>
        </React.Fragment>
        // <CheckOptions text='Об`єм (маса) каналу витрати 1'/>
        
    )
}

export default Counter