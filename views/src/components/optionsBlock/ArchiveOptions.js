import React from 'react';
import { connect } from 'react-redux';
import './ArchiveOptions.scss';
import RangeDate from './RangeDate';
import {setParamOption, setIsDaily} from '../../redux/actions/checkBoxParam'
import {ArchiveObject} from '../../objectsDataChart/ArchiveObject';
import {CurrentObject} from '../../objectsDataChart/CurrentObject';

const ArchiveOptions = ({isCurrent, setParamOption, isDaily, setIsDaily}) => {
    return (
        <div className='ArchiveOptions'>
            <RangeDate/>
            <div className='options-block'>
                <span className='options-block__isDaily-btn' onClick={() => setIsDaily(!isDaily)}>{isDaily ? 'Добовий графік' : 'Почасовый графік'}</span>
                <select className='options-block__select-block' onChange={(e) => setParamOption(e.target.value)}>
                    {Object.keys(ArchiveObject).map((item, index) => (
                        <option key={index + 3} value={item} style={{margin: '5px'}}>{ArchiveObject[item]}</option>
                    ))}
                </select>
            </div>
            
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
    setIsDaily
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveOptions)