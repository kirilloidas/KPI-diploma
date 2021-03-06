import React from 'react'
import './Button.scss'

const Button = ({text}) => {
    return (
        <a href="#" id="authorization" className="Button">{text}</a>
    )
}

export default Button