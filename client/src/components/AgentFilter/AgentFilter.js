import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import TextInput from '../Widgets/TextInput/TextInput';
import './AgentFilter.scss';
import axios from 'axios';
//import data from '../../db';


class AgentFilter extends Component{
   state = {
     top:'',
     height:'',
     scroll:'',
     citySelectOptions:[]
   }

   getCityOptions = async ()=>{
    let res = await axios.get('/api/agents/getcities');
    let { data } = res
    const citySelectOptions = data.map((city)=>{
      return({
        value:city.city,
        content:city.city
      })
    })
    this.setState({citySelectOptions})
  }

  componentDidMount(){
    this.getCityOptions()
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
  }

  componentWillUnmount(){
    document.body.style.paddingTop = 0;
  }

  handleScroll = ()=>{
    this.setState({
      scroll: window.scrollY
    })
  }

  handleChange = (e)=>{
    console.log(e, "this is the event")
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
                onChange={this.props.handleUserInput}
                value={this.props.agentName}
                border
              />

              <Select
                name ="agentCity"
                className="agent-filter__select"
                border size="small"
                options={[{value:'',content:'All Cities'},...this.state.citySelectOptions]}
                onChange={(e)=>this.props.handleUserInput(e)}
                value={this.props.city}
              />

            </ContentContainer>
          </div>
      )
    }
};

export default AgentFilter;
