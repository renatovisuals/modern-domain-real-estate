import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SliderTemplates from'../Widgets/Slider/Slider_templates';
import AgentHeader from '../AgentHeader/AgentHeader';
import { Link } from 'react-router-dom';
import data from '../../db';
import './AgentLandingPage.scss';


const AgentLandingPage = (props)=> {
  const agentData = data.agents.find((agent)=>{
    return agent.id === props.match.params.id;
  })
  
  return(
    <div className = "agent-landing-page">
      <AgentHeader data ={agentData}/>
    </div>
  )

}

export default AgentLandingPage;
