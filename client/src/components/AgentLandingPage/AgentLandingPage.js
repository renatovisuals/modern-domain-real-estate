import React, { Component } from 'react';
import Nav from '../Nav/Nav';
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
      let res = await axios.get(`/api/agents/get/?id=${this.props.match.params.id}`);
      console.log(res.data,"this is the res")
      this.setState({ agentData: res.data[0] });
    };
    agentData()
  }

  agentData = data.agents.find((agent)=>{
    return agent.agent_id === this.props.match.params.id;
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
        <Nav/>
        {this.renderModal()}
        <AgentHeader data ={this.state.agentData} toggleModal = {this.toggleModal}/>
        <AgentInfo data ={this.state.agentData} toggleModal = {this.toggleModal}/>
      </div>
    )
  }

}

export default AgentLandingPage;
