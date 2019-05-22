import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import './AgentModal.scss';


const AgentModal = (props)=> {
  const styles = {
    underlineStyle: {
      borderColor:'red'
    }
  }
  return(
    <CSSTransition
      in={props.appear}
      appear={true}
      timeout={300}
      unmountOnExit={true}
      classNames={{
          appear:'agent-modal--appear',
          appearActive:'agent-modal--appear-active',

          enter: 'agent-modal--enter',
          enterActive: 'agent-modal--enter-active',
          enterDone: 'agent-modal--enter-done',

          exit: 'agent-modal--exit',
          exitActive: 'agent-modal--exit-active',
          exitDone: 'agent-modal--exit-done'
      }}
    >
      <div className = "agent-modal" onClick = {(e)=>{props.handleModalClick(e)}}>
        <span className = "agent-modal__ex-icon" onClick = {props.toggleModal}> &#10005; </span>
        <div className="agent-modal__form-container">
          <div className = "agent-modal__form-title"> Work With Dan Bilzerian </div>
          <form autocomplete="on" onSubmit ={(e)=>{e.preventDefault()}}>
            <div className="agent-modal__input-container--narrow">
              <input name="first name" placeholder="First Name" type ="text"/>
              <p className ="agent-modal__input-error-text">please enter a first name</p>
            </div>
            <div className="agent-modal__input-container--narrow">
              <input className= "agent-modal__input-error" name="last name" placeholder="Last Name" type ="text"/>
              <p className ="agent-modal__input-error-text">please enter a last name</p>
            </div>
            <div className="agent-modal__input-container">
              <input name="email" placeholder="Email" type ="text"/>
              <p className ="agent-modal__input-error-text">please enter a valid email</p>
            </div>
            <div className="agent-modal__input-container">
              <input name="phone" placeholder="Phone(optional)" type ="text"/>
              <p className ="agent-modal__input-error-text">please enter a last name</p>
            </div>

            <div className ="agent-modal__form-select-title"> I Want To</div>

            <div>
              <input name="transaction" value="buy" type="radio" id="buy"/>
              <label className="transaction-label" htmlFor="buy">Buy</label>
            </div>
            <div>
              <input name="transaction" value="sell" type="radio" id="sell"/>
              <label className="transaction-label" htmlFor="sell">Sell</label>
            </div>
            <div>
              <input name="transaction" value="rent" type="radio" id="rent"/>
              <label className="transaction-label" htmlFor="rent">Rent</label>
            </div>
            <p className ="agent-modal__input-error-text agent-modal__input-error-text--radio">please select an option</p>

            <button type="submit" className = "agent-modal__form-submit-btn">
              submit form
            </button>

          </form>
        </div>
      </div>
    </CSSTransition>
  )

}

export default AgentModal;
