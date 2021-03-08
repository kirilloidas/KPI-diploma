import React from 'react'
import './Button.scss'

const Button = ({text, onClick = () => {}}) => {
    return (
        <span className="Button" onClick={(e) => onClick(e)}>{text}</span>
    )
}

export default Button