import React from 'react'
import './CounterIcon.scss'

const CounterIcon = () => {
    return (
        <span className="home-svg" dangerouslySetInnerHTML={{__html: '<svg height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg"><rect fill="#CDD1DA" height="18" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="4" x="18" y="3" /><rect fill="#CDD1DA" height="13" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="4" x="10" y="8" /><rect fill="#CDD1DA" height="8" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="4" x="2" y="13" /></svg>'}} />
    )
}

export default CounterIcon


