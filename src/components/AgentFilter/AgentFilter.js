import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import TextInput from '../Widgets/TextInput/TextInput';
import './AgentFilter.scss';


const AgentFilter = (props)=>{
  const testFunction = ()=>{
    console.log("this is a test");
  }
    return(
        <div className="agent-filter">
          <ContentContainer className = "agent-filter__input-container">
            <TextInput
              name ="agent-name"
              placeholder="filter by agent name"
              className="agent-filter__text-input"
              size="small"
              handleUserInput={props.handleUserInput}
              value={props.agentName}
              border
            />

            <Select
              name ="agent-city"
              className="agent-filter__select"
              border size="small"
              options={[{value:'fort worth',content:'fortworth'}]}
              onChange={props.onChange}
              value={props.city}
            />

          </ContentContainer>
        </div>
    )
}

export default AgentFilter;
