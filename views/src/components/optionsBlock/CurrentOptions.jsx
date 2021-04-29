import React from 'react'
import {CurrentObject} from '../../objectsDataChart/CurrentObject';
import {setCurrentParamOption} from '../../redux/actions/checkBoxParam';
import { connect } from 'react-redux'

const CurrentOptions = ({setCurrentParamOption}) => {
    return (
        <div className='CurrentOptiuons'>
            <div className='current-options-block'>
                <select className='current-options-block__select-block' onChange={(e) => setCurrentParamOption(e.target.value)}>
                    {Object.keys(CurrentObject).map((item, index) => (
                        <option key={index + 3} value={item} style={{margin: '5px'}}>{CurrentObject[item]}</option>
                    ))}
                </select>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {
    setCurrentParamOption
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOptions)