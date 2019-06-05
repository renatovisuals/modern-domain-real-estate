import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import AgentFilter from '../AgentFilter/AgentFilter';
import Select from '../Widgets/Select/Select';
import TextInput from '../Widgets/TextInput/TextInput';
import Card from '../Widgets/Card/Card';
import { Link } from 'react-router-dom';
import data from '../../db';
import './MainAgentPage.scss';


class MainAgentPage extends Component {

  state = {
    city:'',
    agentName:'',
    agentCity:'',
    agentData:[]
  }

  handleUserInput = (e)=>{
    console.log(e.target.name, "this is the event")
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]:value
    },()=>this.filterData())
  }

  componentDidMount(){
    window.scrollTo(0,0);
    this.setState({
      agentData: data.agents
    })
  }


  filterData = ()=>{
    const agentName = this.state.agentName.toLowerCase();
    const filteredData = data.agents.filter((agent)=>{
      const nameMatch = (agent.firstName +' '+ agent.lastName).toLowerCase().indexOf(agentName) === 0 || agent.lastName.toLowerCase().indexOf(agentName) === 0 || this.state.agentName === '';
      const cityMatch = agent.city === this.state.agentCity || this.state.agentCity === '';
      return nameMatch && cityMatch;
    })
    this.setState({
      agentData:filteredData
    })
  }

  renderAgents= ()=>{
    if (this.state.agentData.length === 0){
      return(
        <div className = "main-agent-page__filter-error"> No results were found. </div>
      )
    }
    return(
      <div className ="main-agent-page__agents">
        {this.state.agentData.map((agent)=>{
          return(
            <Link to = {`/agents/${agent.firstName.toLowerCase()}-${agent.lastName.toLowerCase()}/${agent.id}`}>
              <Card className="main-agent-page__agent" type="agent" data={agent}/>
            </Link>
          )
        })}
      </div>
    )
  }

  render(){
    return(
      <div className="main-agent-page">
        <AgentFilter city = {this.state.agentCity} agentName = {this.state.agentName} handleUserInput = {this.handleUserInput}/>
        <ContentContainer>
         <h1 className ="main-agent-page__title"> Find an Agent Near You </h1>
         <p className = "main-agent-page__description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
         {this.renderAgents()}
        </ContentContainer>
      </div>
    )
  }
}

export default MainAgentPage;
