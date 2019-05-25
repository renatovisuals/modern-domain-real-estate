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
    inputErrors:{},
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
    })

    console.log(name,value,'this is an input');
  }

  validateField = ()=>{
    let formValid = false;
    let inputErrors = {
      firstName:null,
      lastName:null,
      email:null,
      phone:null,
      transaction:null
    }
    const formKeys = Object.keys(this.state);
    formKeys.forEach((key)=>{
      switch(key) {
        case 'firstName':
        if(this.state.firstName.length === 0){
          inputErrors.firstName='please enter a first name';
          this.setState({
          firstNameValid:false
          })
        }
      }
    })
    if(this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.phoneValid && this.state.transactionValid){
      this.setState({
        formValid:true
      })
    }else{
      this.setState({
        inputErrors
      },console.log(this.state.inputErrors, "these are the new errors"))
    }

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
          <AgentContactForm formData = {this.state} validate = {this.validateField} handleUserInput = {this.handleUserInput}/>
        </div>
      </CSSTransition>
    )
  }

}

export default AgentModal;
