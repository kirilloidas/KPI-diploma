import React from 'react'
import './Input.scss'

const InputInterval = ({placeholderName, onChange = () => {}}) => {
    return (
        <input type="text" placeholder={placeholderName} className='input-interval' onChange={(e) => onChange(e.target.value)}/>
    )
}

export default InputInterval