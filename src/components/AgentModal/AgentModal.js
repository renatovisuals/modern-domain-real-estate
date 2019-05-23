import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import './AgentModal.scss';


class AgentModal extends Component {

  state={
    firstName:null,
    lastName:null,
    email:null,
    phone:null,
    transaction:null,
    inputErrors:{
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
      transaction:''
    },
    firstNameValid:true,
    lastNameValid:true,
    emailValid:true,
    phoneValid:true,
    transactionValid:true,
    formValid:true
  }

  handleUserInput(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]:value
    }, this.validateField(name,value))
  }

  validateField(fieldName,value){
    let formErrors = this.state.inputErrors;
    let {firstNameValid,lastNameValid,emailValid,phoneValid,transactionValid,formValid} = this.state;

    switch(fieldName) {
      case 'firstName':
        console.log('The first name has been validated')
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
          <div className="agent-modal__form-container">
            <div className = "agent-modal__form-title"> Work With Dan Bilzerian </div>
            <form autocomplete="on" onSubmit ={(e)=>{e.preventDefault(); console.log("form was submitted!")}}>
              <div className="agent-modal__input-container--narrow">
                <input name="firstName" placeholder="First Name" type ="text"  value={this.state.firstName} onChange={(e)=>{this.handleUserInput(e)}}/>
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

}

export default AgentModal;
