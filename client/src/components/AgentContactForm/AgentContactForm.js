import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import './agentcontactform.scss';


class AgentContactForm extends Component{
  componentDidMount(){
    const height = document.getElementById('agent-form').clientHeight;
    this.props.setContainerHeight(height);
  }

  render(){
    const {inputErrors,submissionFailed,phoneValid,emailValid,firstNameValid,lastNameValid} = this.props.formData;
    return(
      <CSSTransition
        in={this.props.appear}
        appear={true}
        timeout={300}
        unmountOnExit={true}
        classNames={{
            exit: 'agent-contact-form--exit',
            exitActive: 'agent-contact-form--exit-active',
        }}
      >
        <div className="agent-contact-form" id="agent-form">
          <div className = "agent-contact-form__form-title"> {`Work with ${this.props.agent.first_name} ${this.props.agent.last_name}`} </div>
          <form autocomplete="on" onSubmit ={(e)=>{this.props.submitForm(e)}}>
            <div className={`agent-contact-form__input-container--narrow ${ !firstNameValid && submissionFailed ? 'agent-contact-form__input-error' : null }`}>
              <input name="firstName" placeholder="First Name" type ="text"  value={this.props.formData.first_name} onChange={(e)=>{this.props.handleUserInput(e)}}/>
              <p className="agent-contact-form__input-error-text"> {inputErrors.firstName} </p>
            </div>
            <div className={`agent-contact-form__input-container--narrow ${ !lastNameValid && submissionFailed ? 'agent-contact-form__input-error' : null}`}>
              <input name="lastName" placeholder="Last Name" type ="text" value={this.props.formData.last_name} onChange={(e)=>{this.props.handleUserInput(e)}}/>
              <p className="agent-contact-form__input-error-text"> {inputErrors.lastName} </p>
            </div>
            <div className={`agent-contact-form__input-container ${ !emailValid && submissionFailed ? 'agent-contact-form__input-error' : null}`}>
              <input name="email" placeholder="Email" type ="text" value={this.props.formData.email} onChange={(e)=>{this.props.handleUserInput(e)}}/>
              <p className="agent-contact-form__input-error-text"> {inputErrors.email} </p>
            </div>
            <div className="agent-contact-form__input-container">
              <input name="phone" placeholder="Phone(optional)" type ="text" value={this.props.formData.phone} onChange={(e)=>{this.props.handleUserInput(e)}}/>
              <p className ="agent-contact-form__input-error-text">please enter a last name</p>
            </div>

            <div className ="agent-contact-form__form-select-title"> I Want To</div>

            <div style={{display:'inherit',justifyContent:'inherit',width:'inherit'}} value = {this.props.formData.transactionType} onChange ={(e)=>{this.props.handleUserInput(e)}}>
              <div>
                <input name="transactionType" value="buy" type="radio" id="buy" checked = {this.props.formData.transactionType === 'buy'}/>
                <label className="transaction-label" htmlFor="buy">Buy</label>
              </div>
              <div>
                <input name="transactionType" value="sell" type="radio" id="sell" checked = {this.props.formData.transactionType === 'sell'} />
                <label className="transaction-label" htmlFor="sell">Sell</label>
              </div>
              <div>
                <input name="transactionType" value="rent" type="radio" id="rent" checked = {this.props.formData.transactionType === 'rent'}/>
                <label className="transaction-label" htmlFor="rent">Rent</label>
              </div>
            </div>

            <button type="submit" className = "agent-contact-form__form-submit-btn" onClick ={this.props.validate}>
              submit form
            </button>
          </form>
        </div>
      </CSSTransition>
    )
  }

}

export default AgentContactForm;
