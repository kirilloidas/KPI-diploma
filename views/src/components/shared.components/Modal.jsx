import React from 'react';
import {connect} from 'react-redux';
import './Modal.scss';
import {setModalMessage} from '../../redux/actions/main'

const Modal = (props) => {
  return (
    <div style={{display: props.modalMessage ? 'flex' : 'none'}} class="modal-wrap">
      <div class="modal">
        <h2 class="title">You have error:</h2>
        <div class="content">
          {props.modalMessage}
        </div>
        <div class="btn-container">
          <button onClick={() => props.setModalMessage('')} class="btn">Close</button>
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