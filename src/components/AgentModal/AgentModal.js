import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import AgentContactForm from '../AgentContactForm/AgentContactForm';
import './AgentModal.scss';


class AgentModal extends Component {

  state={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    transaction:'',
    showErrors:false,
    inputErrors:{
      firstName:"please enter a first name",
      lastName:"please enter a last name",
      email:"please enter a valid email",
      phone:null,
      transaction:null
    },
    firstNameValid:false,
    lastNameValid:false,
    emailValid:false,
    phoneValid:false,
    transactionValid:false,
    formValid:false
  }

  handleUserInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]:value
    },()=>{this.validateField(name,value)})
  }

  onFormSubmit = (e)=>{
  e.preventDefault();
   if(this.state.formValid){
     console.log("form submission successful");
   }else{
     this.setState({
       showErrors:true
     })
   }
  }

  validateField = (fieldName,value)=>{
    let inputErrors = this.state.inputErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    let formValid = this.state.formValid;

    switch(fieldName) {
      case "firstName":
        firstNameValid = value.length >0;
        inputErrors.firstName = firstNameValid ? '' : 'enter a first name';
        break;
      case "lastName":
        lastNameValid = value.length >0;
        inputErrors.lastName = lastNameValid ? '' : 'enter a last name';
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        inputErrors.email = emailValid ? '' : 'please enter a valid email';
        break;
      default:
    }

    if(firstNameValid && lastNameValid && emailValid){
        formValid = true
    }

  this.setState({
    inputErrors,
    lastNameValid,
    firstNameValid,
    emailValid,
    phoneValid
  })

  }

  render(){
    const styles = {
      underlineStyle: {
        borderColor:'red'
      }
    }
    return(
      <CSSTransition
        in={this.props.appear}
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
        <div className = "agent-modal" onClick = {(e)=>{this.props.handleModalClick(e)}}>
          <span className = "agent-modal__ex-icon" onClick = {this.props.toggleModal}> &#10005; </span>
          <AgentContactForm formData = {this.state} validate = {this.validateField} handleUserInput = {this.handleUserInput} submitForm = {this.onFormSubmit} agent = {this.props.agent}/>
        </div>
      </CSSTransition>
    )
  }

}

export default AgentModal;
