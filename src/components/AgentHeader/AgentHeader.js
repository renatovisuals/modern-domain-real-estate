import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import { Link } from 'react-router-dom';
import data from '../../db';
import './AgentHeader.scss';


const AgentHeader = (props)=> {
  console.log(props.data.image, 'this is the image');
  return(
    <div className = "agent-header">
      <ContentContainer>
        <div className = "agent-header__content">
          <div className = "agent-header__image" style={{background:`url('/images/agents/${props.data.image}')`, backgroundSize:'cover'}}> </div>
          <div className = "agent-header__description">
            <span className = "agent-header__agent-name"> {`${props.data.firstName} ${props.data.lastName}`} </span>
          </div>
        </div>
      </ContentContainer>
    </div>
  )

}

export default AgentHeader;
