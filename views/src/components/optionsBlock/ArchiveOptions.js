import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ArchiveOptions.scss';
import RangeDate from './RangeDate';
import {setParamOption, setIsDaily, setTimeObj, setStartTimeAction, setEndTimeAction} from '../../redux/actions/checkBoxParam'
import {ArchiveObject} from '../../objectsDataChart/ArchiveObject';
import TimeKeeper from 'react-timekeeper';
import moment from 'moment';
import {User} from '../../api/User';
import {CurrentObject} from '../../objectsDataChart/CurrentObject';
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';

const ArchiveOptions = ({isCurrent, setParamOption, isDaily, setIsDaily, setTimeObj, setStartTimeAction, setEndTimeAction}) => {
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:00');
    const [isStartTime, setIsStartTime] = useState(true);
    const [isMailBlock, setIsMailBlock] = useState(false);
    const [mail, setMail] = useState('');
    useEffect(() => {
        setIsStartTime(true)
    }, [isDaily])

    // const setTime = (time) => {
    //     const obj = new Object();
    //     if(isStartTime) {
    //         setStartTime(time)
    //         // obj.startTime = moment(startTime, 'HH:mm').get('hour');
    //         setStartTimeAction(moment(startTime, 'HH:mm').get('hour'))
    //     } else {
    //         setEndTime(time)
    //         // obj.endTime = moment(endTime, 'HH:mm').get('hour');
    //         setEndTimeAction(moment(endTime, 'HH:mm').get('hour'))
    //     }
    //     // setTimeObj(obj);
    //     console.log(startTime, endTime)
    // }

    useEffect(() => {
        setStartTimeAction(moment(startTime, 'HH:mm').get('hour'));
        setEndTimeAction(moment(endTime, 'HH:mm').get('hour'))
    }, [startTime, endTime])
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
                {/* <span className='downloadExcel' onClick={() => User.downloadExcel()}>Завантажити ексель</span> */}
                <a href='http://localhost:5000/api/downloadExcel' className='downloadExcel'>Завантажити ексель</a>
                <span className='sendToMail' onClick={() => setIsMailBlock(true)}>Відправити на пошту</span>
                <div className='blur blur-block' style={{display: isMailBlock ? 'flex' : 'none'}}>
                        <div className='blur-block__sendToMail-blur'>
                            <p className='title'>Введіть пошту</p>
                            <input className='sendMail-input' onChange={(e) => setMail(e.target.value)}/>
                            <span className='sendMail-btn' onClick={() => {User.excelToMail(mail); setIsMailBlock(false)}}>Відправити</span>
                        </div>
                </div>
            </div>
            {!isDaily ? 
                <React.Fragment>
                    <div className='TimeKeeper-block'>
                    <TimeKeeper
                    time={startTime}
                    onChange={(newTime) => setStartTime(newTime.formatted24)}
                    hour24Mode
                    coarseMinutes={60}
                    forceCoarseMinutes
                    />
                    <span className='TimeKeeper-block__btn' >Задати поч. час</span>
                    </div>
                    <div className='TimeKeeper-block'>
                        <TimeKeeper
                        time={endTime}
                        onChange={(newTime) => setEndTime(newTime.formatted24)}
                        hour24Mode
                        coarseMinutes={60}
                        forceCoarseMinutes
                        />
                        <span className='TimeKeeper-block__btn' >Задати кінц. час</span>
                    </div>
                </React.Fragment>
                 : null
            }
            
            <Helmet>
                <style>{`
                --main-bg: none !important;
                .css-nakgy8-TimeKeeper{
                    background: none !important;
                }
                .css-1lmy46j-ClockWrapper{
                    background: none !important;
                }
                .css-tqvze-ClockWrapper{
                    background: none !important;
                }
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