import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import AgentAboutPanel from '../AgentAboutPanel/AgentAboutPanel';
import AgentInfoPanel from '../AgentInfoPanel/AgentInfoPanel';
import { Link } from 'react-router-dom';
import './agentinfo.scss';


const AgentInfo = (props)=> {

  return(
    <div className = "agent-info">
      <ContentContainer>
        <AgentInfoPanel data = {props.data}/>
        <AgentAboutPanel data = {props.data}/>
      </ContentContainer>
    </div>
  )

}

export default AgentInfo;
