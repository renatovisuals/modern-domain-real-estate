import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import TextInput from '../Widgets/TextInput/TextInput';
import './AgentFilter.scss';
import data from '../../db';


class AgentFilter extends Component{
   state = {
     top:'',
     height:'',
     scroll:''
   }

   getCityOptions = ()=>{
    const arr = []
    for(let i =0; i<data.agents.length; i++){
     const agent = data.agents[i];
     arr.push(agent.city)
    }
    const cities = [...new Set(arr)];
    const options = cities.map((city)=>{
      return({
        value:city,
        content:city
      })
    })
    return options;
  }

  componentDidMount(){
    const filter = document.getElementById('agent-filter');
    this.setState({
      top:filter.offsetTop,
      height:filter.offsetHeight
    })
    window.addEventListener('scroll',this.handleScroll);
  }

  componentDidUpdate(){
    this.state.scroll > this.state.top ?
      document.body.style.paddingTop = `${this.state.height}px`
      :
      document.body.style.paddingTop = 0;
      console.log(this.state.height, "this is the height")
  }

  handleScroll = ()=>{
    this.setState({
      scroll: window.scrollY
    })
  }

    render(){
      return(
          <div className={`agent-filter ${this.state.scroll > this.state.top ? 'agent-filter--sticky' : null}`} id="agent-filter">
            <ContentContainer className = "agent-filter__input-container">
              <TextInput
                name ="agentName"
                placeholder="filter by agent name"
                className="agent-filter__text-input"
                size="small"
                handleUserInput={this.props.handleUserInput}
                value={this.props.agentName}
                border
              />

              <Select
                name ="agentCity"
                className="agent-filter__select"
                border size="small"
                options={[{value:'',content:'All Cities'},...this.getCityOptions()]}
                onChange={this.props.handleUserInput}
                value={this.props.city}
              />

            </ContentContainer>
          </div>
      )
    }
};

export default AgentFilter;
