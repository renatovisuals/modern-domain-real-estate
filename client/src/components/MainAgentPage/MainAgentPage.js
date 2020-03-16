import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import Nav from '../Nav/Nav';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import AgentFilter from '../AgentFilter/AgentFilter';
import Select from '../Widgets/Select/Select';
import TextInput from '../Widgets/TextInput/TextInput';
import Card from '../Widgets/Card/Card';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import data from '../../db';
import './MainAgentPage.scss';


class MainAgentPage extends Component {

  state = {
    city:'',
    agentName:'',
    agentCity:'',
    agentData:[],
    agents:[]
  }

  handleUserInput = (name,value)=>{
    this.setState({
        [name]:value
    },()=>this.filterData())
  }

  componentDidMount(){
    window.scrollTo(0,0);
    const agentData = async () => {
      let res = await axios.get(`/api/agents/get`);
      this.setState({
        agentData: res.data,
        agents:res.data
      },()=>console.log(this.state.agentData,"Agent Data"));
      console.log(res,"res")
    };
    agentData()
  }


  filterData = ()=>{
    const agentName = this.state.agentName.toLowerCase().trim();
    const filteredData = this.state.agentData.filter((agent)=>{
    const fullName = agent.first_name + ' ' + agent.last_name;
    const regex = new RegExp(`^${agentName}|\\s${agentName}`,'gi')
    let nameMatch = fullName.match(regex)
    //nameMatch = true;
    const cityMatch = agent.city === this.state.agentCity || this.state.agentCity === '';
    return nameMatch && cityMatch;
    })
    this.setState({
      agents:filteredData
    })
  }

  renderAgents= ()=>{
    console.log(this.state.agents)
    if (this.state.agents.length === 0){
      return(
        <div className = "main-agent-page__filter-error"> No results were found. </div>
      )
    }
    return(
      <div className ="main-agent-page__agents">
        {this.state.agents.map((agent)=>{
          return(
            <Link to = {`/agents/${agent.first_name.toLowerCase()}-${agent.last_name.toLowerCase()}/${agent.agent_id}`}>
              <Card className="main-agent-page__agent" type="agent" data={agent} imagePath='./images/agents'/>
            </Link>
          )
        })}
      </div>
    )
  }

  render(){
    return(
      <div className="main-agent-page">
        <Nav/>
        <AgentFilter city = {this.state.agentCity} agentName = {this.state.agentName} handleUserInput = {this.handleUserInput}/>
        <ContentContainer>
         <h1 className ="main-agent-page__title"> Find an Agent Near You </h1>
         <p className = "main-agent-page__description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
         {this.renderAgents()}
        </ContentContainer>
        <Footer/>
      </div>
    )
  }
}

export default MainAgentPage;
