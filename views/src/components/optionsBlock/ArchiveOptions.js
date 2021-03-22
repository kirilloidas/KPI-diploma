import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ArchiveOptions.scss';
import RangeDate from './RangeDate';
import {setParamOption, setIsDaily, setTimeObj, setStartTimeAction, setEndTimeAction} from '../../redux/actions/checkBoxParam'
import {ArchiveObject} from '../../objectsDataChart/ArchiveObject';
import TimeKeeper from 'react-timekeeper';
import moment from 'moment';
import {CurrentObject} from '../../objectsDataChart/CurrentObject';
import Helmet from "react-helmet";

const ArchiveOptions = ({isCurrent, setParamOption, isDaily, setIsDaily, setTimeObj, setStartTimeAction, setEndTimeAction}) => {
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('12:00pm');
    const [isStartTime, setIsStartTime] = useState(true)
    useEffect(() => {
        setIsStartTime(true)
    }, [isDaily])

    const setTime = (time) => {
        const obj = new Object();
        if(isStartTime) {
            setStartTime(time)
            // obj.startTime = moment(startTime, 'HH:mm').get('hour');
            setStartTimeAction(moment(startTime, 'HH:mm').get('hour'))
        } else {
            setEndTime(time)
            // obj.endTime = moment(endTime, 'HH:mm').get('hour');
            setEndTimeAction(moment(endTime, 'HH:mm').get('hour'))
        }
        // setTimeObj(obj);
        console.log(startTime, endTime)
    }
    return (
        <div className='ArchiveOptions'>
            <RangeDate startTime={moment(startTime, 'HH:mm').get('hour')} endTime={moment(endTime, 'HH:mm').get('hour')}/>
            <div className='options-block'>
                <span className='options-block__isDaily-btn' onClick={() => setIsDaily(!isDaily)}>{isDaily ? 'Добовий графік' : 'Почасовый графік'}</span>
                <select className='options-block__select-block' onChange={(e) => setParamOption(e.target.value)}>
                    {Object.keys(ArchiveObject).map((item, index) => (
                        <option key={index + 3} value={item} style={{margin: '5px'}}>{ArchiveObject[item]}</option>
                    ))}
                </select>
            </div>
            {!isDaily ? 
                <div className='TimeKeeper-block'>
                    <TimeKeeper
                    time={isStartTime ? startTime : endTime}
                    onChange={(newTime) => setTime(newTime.formatted24)}
                    hour24Mode
                    coarseMinutes={60}
                    forceCoarseMinutes
                    />
                    <span className='TimeKeeper-block__btn' onClick={() => setIsStartTime(!isStartTime)}>{isStartTime ? 'Задати поч. час' : 'Задати кінц. час'}</span>
                </div>
                 : null
            }
            
            <Helmet>
                <style>{`
                    .react-timekeeper {
                        --top-bg: none;
                        background: none;
                        --meridiem-text-color: red;
                        --numbers-text-color: red;
                        --hand-line-color: red;
                        --meridiem-bg-color: red;
                        --hand-circle-center: red;
                    }
                    .css-nakgy8-TimeKeeper{
                        --top-bg: none;
                        background: none;
                    }
                    .react-timekeeper__top-bar{
                        background: none
                    }
                    .react-timekeeper__clock-wrapper{
                        background: none
                    }
                    .react-timekeeper__tb-hour{
                        color: red
                    }
                    .react-timekeeper__tb-minute--active{
                        color: red
                    }
                    .react-timekeeper__clock{
                        background: none
                    }
                `}</style>
            </Helmet>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        isCurrent: state.mainReducer.isCurrent,
        isDaily: state.checkBoxReducer.isDaily
    }
}

const mapDispatchToProps = {
    setParamOption,
    setIsDaily,
    setTimeObj,
    setStartTimeAction,
    setEndTimeAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveOptions)