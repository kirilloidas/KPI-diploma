import React, { useState } from 'react'
import { connect } from 'react-redux';
import selectImg from '../../img/select-triangle.svg';
import {createRole} from '../../redux/actions/createUser'
import './Input.scss'


const CustomSelect = (props) => {
    const [role, setRole] = useState('');
    const [showSelect, setShowSelect] = useState(false);

    const toggleVisible = () => {
        setShowSelect(!showSelect);
    }
    const selectRole = (role) => {
        setRole(role);
        toggleVisible();
        props.createRole(role)
    }
    return (
        <label className='custom-select-block'>Role
            <input className="input-field" type="text" defaultValue={role} readOnly />
            <span onClick={() => toggleVisible()} className="triangle">
                <img src={selectImg} alt="select" />
            </span>
            {showSelect ?
            (<ul className="list-related-numbers">
                <li onClick={() => selectRole('User')}>User</li>
                <li onClick={() => selectRole('Admin')}>Admin</li>
            </ul>)
            : null}
        </label>
    )
}

const mapDispatchToProps = {
    createRole
}

export default connect(null, mapDispatchToProps)(CustomSelect)