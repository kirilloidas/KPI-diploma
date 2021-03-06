import React from 'react'
import { connect } from 'react-redux'
import {setIsDaily} from '../../redux/actions/checkBoxParam'
import './CheckMode.scss'

const CheckMode = ({setIsDaily}) => {

    return (
        <div className="switch_schedule">
            <input type="checkbox" id="checkbox_switch" onChange={(e) => {setIsDaily(!e.target.checked)}} />
            <label for="checkbox_switch"></label>
        </div>
    )
}

const mapDispatchToProps = {
    setIsDaily
}

export default connect(null, mapDispatchToProps)(CheckMode)