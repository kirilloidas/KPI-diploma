import React,{useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import CheckMode from "../../components/checkbox/CheckMode";
import CheckOptions from '../../components/checkbox/CheckOptions';
import OptionsBlock from '../../components/optionsBlock/OptionsBlock'
import ChartData from '../../components/charts/Chart'
import {User} from '../../api/User'
import {setIntervalObj, setCheckBoxObj, setCheckBoxItem, setDataToChart} from '../../redux/actions/checkBoxParam'
import { connect } from 'react-redux';

const Counter = () => {
    const [startDay, setStartDay] = useState();
    const [startMonth, setStartMonth] = useState();
    const [startYear, setStartYear] = useState();
    const [startHour, setStartHour] = useState();
    const [endDay, setEndDay] = useState();
    const [endMonth, setEndMonth] = useState();
    const [endYear, setEndYear] = useState();
    const [endHour, setEndHour] = useState();

    useEffect(() => {
            let obj = {
                // startTime: new Date('2020', '10', '10', 0).getTime(),
                // endTime: new Date('2020', '10', '25',  0).getTime(),
            }
            // setIntervalObj(obj)

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
        }).then(data => {setDataToChart(data.data); console.log(data.data)})
        .catch((e) => console.log(e))
    }, [])
    return (
        <React.Fragment>
            <Navbar/>
        </React.Fragment>
        
    )
}

const mapStateToProps = state => {
    return {
        isDaily: state.checkBoxReducer.isDaily,
        checkBoxObj: state.checkBoxReducer.checkBoxObj,
        intervalObj: state.checkBoxReducer.intervalObj
    }
} 

const mapDispatchToProps = {
    setIntervalObj,
    setCheckBoxObj,
    setCheckBoxItem,
    setDataToChart
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)