import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import AgentContactForm from '../AgentContactForm/AgentContactForm';
import AgentFormSuccessPage from '../AgentFormSuccessPage/AgentFormSuccessPage';
import './AgentModal.scss';


class AgentModal extends Component {

  state={}

  componentWillMount(){
    this.setState(this.getInitialState())
    document.addEventListener('click',this.handleOutsideClick, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click',this.handleOutsideClick, false);
  }

  getInitialState = ()=>{
    return(
      {
        height:'',
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        transactionType:'sell',
        submissionFailed:false,
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
        transactionValid:false,
        formValid:false
      }
    )
  }

  handleUserInput = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]:value
    },()=>{this.validateField(name,value)})
  }

  handleModalClose =()=>{
    this.props.toggleModal()
    setTimeout(()=>{
      this.setState(this.getInitialState(), console.log(this.state, 'this is the new state'))
    },300)
  }

  handleOutsideClick =(e)=>{
  if(this.agentModal && this.agentModal.contains(e.target)){
    return
  }
  this.setState({
    submissionSuccess:false
  })
  }

  setModalHeight = (height)=>{
    this.setState({
      height
    })
  }

  onFormSubmit = (e)=>{
  e.preventDefault();
   if(this.state.formValid){
    this.setState(this.getInitialState(),()=>console.log(this.state, 'this is the new state'))
    this.setState({submissionSuccess:true})
    setTimeout(()=>this.handleModalClose(),1800);
   }else{
     this.setState({
       submissionFailed:true
     })
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

  render(){
    const styles = {
      underlineStyle: {
        borderColor:'red'
      }
    }
    console.log(this.state,"this is the state")
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
        <div ref={agentModal=> this.agentModal = agentModal} className = "agent-modal" onClick = {(e)=>{this.props.handleModalClick(e)}} style={{height:this.state.height +'px'}}>
          <span className = "agent-modal__ex-icon" onClick = {this.handleModalClose}> &#10005; </span>
            <AgentContactForm
              formData = {this.state}
              validate = {this.validateField}
              handleUserInput = {this.handleUserInput}
              submitForm = {this.onFormSubmit}
              agent = {this.props.agent}
              appear = {!this.state.submissionSuccess}
              setContainerHeight = {this.setModalHeight}
            />
            <AgentFormSuccessPage agent ={this.props.agent} appear = {this.state.submissionSuccess} submissionSuccess = {this.state.submissionSuccess}/>
        </div>
      </CSSTransition>
    )
  }

}

export default AgentModal;
