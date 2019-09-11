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
import axios from 'axios';


class AgentLandingPage extends Component {

  state = {
    modalWindowOpen:false,
    agentData:null
  }

  componentDidMount(){
    window.scrollTo(0,0);
    const agentData = async () => {
      let res = await axios.get(`/api/agents/${this.props.match.params.id}`);
      this.setState({ agentData: res.data });
    };
    agentData()
  }

  agentData = data.agents.find((agent)=>{
    return agent.id === this.props.match.params.id;
    //return agent.id = 1;
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
            <AgentModal toggleModal = {this.toggleModal} handleModalClick = {this.handleModalClick} appear = {this.state.modalWindowOpen} agent ={this.state.agentData} formSubmitSuccess = {this.state.formSubmitSuccess}/>
            <ModalBackdrop click = {this.toggleModal} hidden = {!this.state.modalWindowOpen}/>
          </div>
      )
  }

  render(){
    if(!this.state.agentData){
      return null;
    }
    return(

      <div className = "agent-landing-page">
        {this.renderModal()}
        <AgentHeader data ={this.state.agentData} toggleModal = {this.toggleModal}/>
        <AgentInfo data ={this.state.agentData} toggleModal = {this.toggleModal}/>
      </div>
    )
  }

}

export default AgentLandingPage;
