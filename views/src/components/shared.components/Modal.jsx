import React from 'react';
import {connect} from 'react-redux';
import './Modal.scss';
import {setModalMessage} from '../../redux/actions/main'

const Modal = (props) => {
  return (
    <div style={{display: props.modalMessage ? 'flex' : 'none'}} className="modal-wrap">
      <div className="modal">
        <h2 className="title">You have error:</h2>
        <div className="content">
          {props.modalMessage}
        </div>
        <div className="btn-container">
          <button onClick={() => props.setModalMessage('')} className="btn">Close</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    modalMessage: state.mainReducer.modalMessage
  }
}

const mapDispatchToProps = {
  setModalMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)