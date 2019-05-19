import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SocialMedia from '../Widgets/SocialMedia/SocialMedia';
import './AgentInfoPanel.scss';


const AgentInfoPanel = (props)=> {
  const links = [
    {
      type:'twitter',
      link:'https://twitter.com/'
    },
    {
      type:'facebook',
      link:'https://www.facebook.com/'
    },
    {
      type:'pinterest',
      link:'https://www.pinterest.com/'
    },
    {
      type:'instagram',
      link:'https://www.instagram.com/?hl=en'
    }
  ]

  return(
    <div className = "agent-info-panel">
      <div className ="agent-info-panel__section">
          <span className = "agent-info-panel__info-title"> Phone </span>
          <span className = "agent-info-panel__info"> 806-500-0114 </span>
          <span className = "agent-info-panel__info-title"> fax </span>
          <span className = "agent-info-panel__info"> 806-500-0114 </span>
      </div>
      <div className ="agent-info-panel__section">
          <span className = "agent-info-panel__info-title"> Email </span>
          <span className = "agent-info-panel__info"> seandoran@moderndomain.com </span>
          <span className = "agent-info-panel__info-title"> Address </span>
          <span className = "agent-info-panel__info"> 3100 Hamilton Ave <br/> apt 3107, Fort Worth, Tx </span>
      </div>
      <div className ="agent-info-panel__section agent-info-panel__section--social">
          <span className = "agent-info-panel__info-title"> Social Media </span>
          <SocialMedia/>
      </div>
    </div>
  )

}

export default AgentInfoPanel;
