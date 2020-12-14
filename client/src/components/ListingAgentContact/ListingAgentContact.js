import React, { Component } from 'react';
import './ListingAgentContact.scss';
import FormTextInput from '../Widgets/FormTextInput/FormTextInput';
import ListingAgentCard from '../ListingAgentCard/ListingAgentCard';
import Button from '../Widgets/Button/Button';
import axios from 'axios';

class ListingAgentContact extends Component {
  state = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    submissionSuccess:false,
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
    formValid:false
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    if(this.props.onSubmit){
      this.props.onSubmit()
    }
  }

  validateField = (fieldName,value)=>{
    let inputErrors = this.state.inputErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
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
    formValid
  })
  }

  handleChange = (name,value)=>{
    console.log("changed",name,value)
  }

  render(){
    return (
        <div className = {`listing-agent-contact ${this.props.className}`}>
          <ListingAgentCard agentData = {this.props.agentData} />
          <form>
            <FormTextInput
              size = "small"
              placeholder = "name"
              name = "name"
              onChange = {this.handleChange}
            />
            <FormTextInput
              size = "small"
              placeholder = "email"
              name = "email"
              onChange = {this.handleChange}
            />
            <FormTextInput
              size = "small"
              placeholder = "phone number"
              error = {true}
              errorMessage = "invalid phone number"
            />
            <Button className = "listing-agent-contact__submit-btn" type = "submit" onClick = {(e)=>this.handleSubmit(e)}> Contact Agent </Button>
          </form>
        </div>
    );
  }
}

export default ListingAgentContact;
