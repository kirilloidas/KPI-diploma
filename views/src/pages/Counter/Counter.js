import React,{useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import CheckMode from "../../components/checkbox/CheckMode";
import CheckOptions from '../../components/checkbox/CheckOptions';
import OptionsBlock from '../../components/optionsBlock/OptionsBlock'
import ChartData from '../../components/charts/Chart'
import CurrentChart from '../../components/charts/CurrentChart'
import {User} from '../../api/User'
import {getCurrentData} from '../../redux/actions/main';
import ArchiveOptions from '../../components/optionsBlock/ArchiveOptions'
import {setIntervalObj, setCheckBoxObj, setCheckBoxItem, setDataToChart, setIsData, setIsGetCurrent} from '../../redux/actions/checkBoxParam'
import { connect } from 'react-redux';

const Counter = ({setDataToChart, setIsData, isCurrent, setIsGetCurrent, currentData, getCurrentData}) => {
    const [startDay, setStartDay] = useState();
    const [startMonth, setStartMonth] = useState();
    const [startYear, setStartYear] = useState();
    const [startHour, setStartHour] = useState();
    const [endDay, setEndDay] = useState();
    const [endMonth, setEndMonth] = useState();
    const [endYear, setEndYear] = useState();
    const [endHour, setEndHour] = useState();

    useEffect(() => {
        if(isCurrent) {
            console.log('3')
            User.getCurrentData()
                .then(data => {
                    setIsGetCurrent(true)
                    getCurrentData(data.data)
                    console.log(data.data)
                })
        } else {
            User.getCurrentData()
                .then(data => {
                    setIsGetCurrent(true)
                    getCurrentData(data.data)
                    console.log(data.data)
                })

            const paramsObj = {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true,
                7: true,
                8: true,
                9: true,
            }
            User.getData({
                startTime: 1604959200000, 
                endTime: 1606255200000,
                switchCheckedObj: paramsObj,
                isDaily: true
            }).then(data => {setDataToChart(data.data); console.log(data.data); setIsData(true); setIsGetCurrent(false)})
            .catch((e) => console.log(e))
        }
        console.log(currentData)
    }, [isCurrent])

    return (
        <React.Fragment>
            {isCurrent 
                ? 
                <React.Fragment>
                    <Navbar/>
                    <CurrentChart/>
                </React.Fragment>
                : <React.Fragment>
                    <ChartData/>
                    <ArchiveOptions/>
                    {/* <OptionsBlock/> */}
                    <Navbar/>
                  </React.Fragment>}
            
        </React.Fragment>
        
    )
}

const mapStateToProps = state => {
    return {
        isDaily: state.checkBoxReducer.isDaily,
        checkBoxObj: state.checkBoxReducer.checkBoxObj,
        intervalObj: state.checkBoxReducer.intervalObj,
        dataToChart: state.checkBoxReducer.dataToChart,
        isCurrent: state.mainReducer.isCurrent,
        currentData: state.mainReducer.currentData
    }
} 

const mapDispatchToProps = {
    setIntervalObj,
    setCheckBoxObj,
    setCheckBoxItem,
    setDataToChart,
    setIsData,
    setIsGetCurrent,
    getCurrentData
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)