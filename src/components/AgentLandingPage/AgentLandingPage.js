import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import SliderTemplates from'../Widgets/Slider/Slider_templates';
import AgentHeader from '../AgentHeader/AgentHeader';
import AgentInfo from '../AgentInfo/AgentInfo';
import AgentModal from '../AgentModal/AgentModal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import { Link } from 'react-router-dom';
import data from '../../db';
import './AgentLandingPage.scss';


class AgentLandingPage extends Component {

  state = {
    modalWindowOpen:false
  }


  agentData = data.agents.find((agent)=>{
    return agent.id === this.props.match.params.id;
  });

  toggleModal = ()=>{
    this.setState(prevState =>({
        modalWindowOpen:!prevState.modalWindowOpen
    }));
  }

  handleModalClick = (e)=>{
   e.stopPropagation()
  }

  renderModal = ()=>{
    if(this.state.modalWindowOpen){
      document.body.classList.add('open-modal');
    }else{
      document.body.classList.remove('open-modal');
    }
      return(
          <div>
            <AgentModal toggleModal = {this.toggleModal} handleModalClick = {this.handleModalClick} appear = {this.state.modalWindowOpen} agent ={this.agentData} formSubmitSuccess = {this.state.formSubmitSuccess}/>
            <ModalBackdrop click = {this.toggleModal} hidden = {!this.state.modalWindowOpen}/>
          </div>
      )
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }

  render(){
    return(

      <div className = "agent-landing-page">
        {this.renderModal()}
        <AgentHeader data ={this.agentData} toggleModal = {this.toggleModal}/>
        <AgentInfo data ={this.agentData} toggleModal = {this.toggleModal}/>
      </div>
    )
  }

}

export default AgentLandingPage;
