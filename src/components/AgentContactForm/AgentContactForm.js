import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import './agentcontactform.scss';


const AgentContactForm = (props)=> {
  const {inputErrors,showErrors,phoneValid,emailValid,firstNameValid,lastNameValid} = props.formData;

  return(
    <div className="agent-contact-form">
      <div className = "agent-contact-form__form-title"> {`Work with ${props.agent.firstName} ${props.agent.lastName}`} </div>
      <form autocomplete="on" onSubmit ={(e)=>{props.submitForm(e)}}>
        <div className={`agent-contact-form__input-container--narrow ${ !firstNameValid && showErrors ? 'agent-contact-form__input-error' : null }`}>
          <input name="firstName" placeholder="First Name" type ="text"  value={props.formData.firstName} onChange={(e)=>{props.handleUserInput(e)}}/>
          <p className="agent-contact-form__input-error-text"> {inputErrors.firstName} </p>
        </div>
        <div className={`agent-contact-form__input-container--narrow ${ !lastNameValid && showErrors ? 'agent-contact-form__input-error' : null}`}>
          <input name="lastName" placeholder="Last Name" type ="text" value={props.formData.lastName} onChange={(e)=>{props.handleUserInput(e)}}/>
          <p className="agent-contact-form__input-error-text"> {inputErrors.lastName} </p>
        </div>
        <div className={`agent-contact-form__input-container ${ !emailValid && showErrors ? 'agent-contact-form__input-error' : null}`}>
          <input name="email" placeholder="Email" type ="text" value={props.formData.email} onChange={(e)=>{props.handleUserInput(e)}}/>
          <p className="agent-contact-form__input-error-text"> {inputErrors.email} </p>
        </div>
        <div className="agent-contact-form__input-container">
          <input name="phone" placeholder="Phone(optional)" type ="text"/>
          <p className ="agent-contact-form__input-error-text">please enter a last name</p>
        </div>

        <div className ="agent-contact-form__form-select-title"> I Want To</div>

        <div>
          <input name="transaction" value="buy" type="radio" id="buy"/>
          <label className="transaction-label" htmlFor="buy">Buy</label>
        </div>
        <div>
          <input name="transaction" value="sell" type="radio" checked="true" id="sell"/>
          <label className="transaction-label" htmlFor="sell">Sell</label>
        </div>
        <div>
          <input name="transaction" value="rent" type="radio" id="rent"/>
          <label className="transaction-label" htmlFor="rent">Rent</label>
        </div>
        <p className ="agent-contact-form__input-error-text agent-contact-form__input-error-text--radio">please select an option</p>

        <button type="submit" className = "agent-contact-form__form-submit-btn" onClick ={props.validate}>
          submit form
        </button>
      </form>
    </div>
  )

}

export default AgentContactForm;
