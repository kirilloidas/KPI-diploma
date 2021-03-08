import React from 'react'
import './CheckOptions.scss'

const CheckOptions = ({onChange = () => {}, text}) => {
    return (
        <label className="checkbox">
            <input type="checkbox" onChange={(e) => {onChange(e.target.checked)}}/>
            <div className="checkbox__text">{text}</div>
        </label>
    )
}

export default CheckOptions