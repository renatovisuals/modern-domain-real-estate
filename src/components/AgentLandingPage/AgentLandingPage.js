import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SliderTemplates from'../Widgets/Slider/Slider_templates';
import AgentHeader from '../AgentHeader/AgentHeader';
import AgentInfo from '../AgentInfo/AgentInfo';
import { Link } from 'react-router-dom';
import data from '../../db';
import './AgentLandingPage.scss';


class AgentLandingPage extends Component {
  agentData = data.agents.find((agent)=>{
    return agent.id === this.props.match.params.id;
  })

  componentDidMount(){
    window.scrollTo(0,0);
  }

  render(){
    return(
      <div className = "agent-landing-page">
        <AgentHeader data ={this.agentData}/>
        <AgentInfo data ={this.agentData}/>
      </div>
    )
  }

}

export default AgentLandingPage;
