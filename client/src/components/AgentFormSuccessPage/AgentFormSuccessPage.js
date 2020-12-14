import React, { Component } from 'react';
import './AgentFormSuccessPage.scss';
import AgentFormSuccessMessage from '../AgentFormSuccessMessage/AgentFormSuccessMessage';
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
        {props.children}
      </div>
    </CSSTransition>
  )

}

export default AgentFormSuccessPage;
