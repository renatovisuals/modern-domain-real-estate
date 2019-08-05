import React, { Component } from 'react';
import './AgentFormSuccessPage.scss';
import {CSSTransition} from 'react-transition-group';


const AgentFormSuccessPage = (props)=> {

  return(
    <CSSTransition
      in={props.appear}
      appear={true}
      timeout={400}
      unmountOnExit={true}
      classNames={{
          appear:'agent-success-page--appear',
          appearActive:'agent-success-page--appear-active',

          enter: 'agent-success-page--enter',
          enterActive: 'agent-success-page--enter-active',
          enterDone: 'agent-success-page--enter-done',

          exit: 'agent-success-page--exit',
          exitActive: 'agent-success-page--exit-active',
          exitDone: 'agent-success-page--exit-done'
      }}
    >
      <div className = "agent-success-page">
        <img className = {`agent-success-page__image ${props.submissionSuccess ? 'agent-success-page__image--animated':null}`} src ="/images/logo-emblem.svg"/>
        <span className = "agent-success-page__title"> Your Message Has Been Sent! </span>
        <span className = "agent-success-page__description"> {`${props.agent.firstName} will contact you shortly!`} </span>
      </div>
    </CSSTransition>
  )

}

export default AgentFormSuccessPage;
