import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import AgentContactForm from '../AgentContactForm/AgentContactForm';
import AgentFormSuccessPage from '../AgentFormSuccessPage/AgentFormSuccessPage';
import Select from '../Widgets/Select/Select';
import './MainAgentPage.scss';


class MainAgentPage extends Component {

  render(){
    return(
      <div className="main-agent-page">
        <div className="main-agent-page__agent-filter">
        </div>
        <Select className="main-agent-page__select" size="small" border options={[{value:'fort worth',content:'fortworth'}]}> </Select>
      </div>
    )
  }
}

export default MainAgentPage;
