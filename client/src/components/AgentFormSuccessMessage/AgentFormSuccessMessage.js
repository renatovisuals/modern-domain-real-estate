import React, { Component } from 'react';
import './AgentFormSuccessMessage.scss';
//import data from '../../db';


class AgentFormSuccessMessage extends Component{
   state = {

   }

    render(){
      return(
          <div className = "agent-success-message">
            <img className = {`agent-success-message__image ${this.props.submissionSuccess ? 'agent-success-message__image--animated':null}`} src ="/images/logo-emblem.svg"/>
            <span className = "agent-success-message__title"> Your Message Has Been Sent! </span>
            <span className = "agent-success-message__description"> {`${this.props.agent.first_name} will contact you shortly!`} </span>
          </div>
      )
    }
};

export default AgentFormSuccessMessage;
