import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import AgentFilter from '../AgentFilter/AgentFilter';
import Select from '../Widgets/Select/Select';
import TextInput from '../Widgets/TextInput/TextInput';
import Card from '../Widgets/Card/Card';
import data from '../../db';
import './MainAgentPage.scss';


class MainAgentPage extends Component {

  state = {
    city:'',
    agentName:'james'
  }

  handleUserInput = (e)=>{
    console.log(e, "user input is being fired")
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]:value
    })
  }

  renderAgents= ()=>{
    return(
      data.agents.map((agent)=>{
        return(
          <Card className="main-agent-page__agent" type="agent" data={agent}/>
        )
      })
    )
    console.log(data.agents,"this is a test");
  }

  render(){
    return(
      <div className="main-agent-page">
        <AgentFilter city = {this.state.city} agentName = {this.state.agentName} handleUserInput = {this.handleUserInput}/>
        <ContentContainer>
         <h1 className ="main-agent-page__title"> Find an Agent Near You </h1>
         <div className ="main-agent-page__agents">
          {this.renderAgents()}
         </div>
        </ContentContainer>
      </div>
    )
  }
}

export default MainAgentPage;
