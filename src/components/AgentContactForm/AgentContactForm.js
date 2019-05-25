import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import './agentcontactform.scss';


const AgentContactForm = (props)=> {
  const {errors} = props.formData.inputErrors;
  console.log(props.formData.inputErrors.firstName, "this")
  const renderError = (errorText)=>{
    if(!props.formData.formValid){
      return(
        <p className="agent-contact-form__input-error-text">{errorText}</p>
      )
    }
  }

  return(
    <div className="agent-contact-form">
      <div className = "agent-contact-form__form-title"> Work With Dan Bilzerian </div>
      <form autocomplete="on" onSubmit ={(e)=>{e.preventDefault(); console.log("form was submitted!")}}>
        <div className="agent-contact-form__input-container--narrow">
          <input className= {`${props.formData.inputErrors.firstName ? "agent-contact-form__input-error" : null}`} name="firstName" placeholder="First Name" type ="text"  value={props.formData.firstName} onChange={(e)=>{props.handleUserInput(e)}}/>
          {renderError(props.formData.inputErrors.firstName)}
        </div>
        <div className="agent-contact-form__input-container--narrow">
          <input className= "agent-contact-form__input-error" name="last name" placeholder="Last Name" type ="text"/>
          <p className ="agent-contact-form__input-error-text">please enter a last name</p>
        </div>
        <div className="agent-contact-form__input-container">
          <input name="email" placeholder="Email" type ="text"/>
          <p className ="agent-contact-form__input-error-text">please enter a valid email</p>
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
          <input name="transaction" value="sell" type="radio" id="sell"/>
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
