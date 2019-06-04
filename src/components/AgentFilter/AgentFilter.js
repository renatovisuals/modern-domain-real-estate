import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import TextInput from '../Widgets/TextInput/TextInput';
import './AgentFilter.scss';
import data from '../../db';


const AgentFilter = (props)=>{
  const getCityOptions = ()=>{
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
    return(
        <div className="agent-filter">
          <ContentContainer className = "agent-filter__input-container">
            <TextInput
              name ="agentName"
              placeholder="filter by agent name"
              className="agent-filter__text-input"
              size="small"
              handleUserInput={props.handleUserInput}
              value={props.agentName}
              border
            />

            <Select
              name ="agentCity"
              className="agent-filter__select"
              border size="small"
              options={[{value:'',content:'All Cities'},...getCityOptions()]}
              onChange={props.handleUserInput}
              value={props.city}
            />

          </ContentContainer>
        </div>
    )
};

export default AgentFilter;
