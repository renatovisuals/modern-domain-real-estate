import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import './ListingPage.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import ListingHeader from '../ListingHeader/ListingHeader';
import ListingPageSlider from '../ListingPageSlider/ListingPageSlider';
import ListingDataTable from '../ListingDataTable/ListingDataTable';
import ListingAgentContact from '../ListingAgentContact/ListingAgentContact';
import ListingModal from '../ListingModal/ListingModal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import AgentFormSuccessPage from '../AgentFormSuccessPage/AgentFormSuccessPage';
import AgentFormSuccessMessage from '../AgentFormSuccessMessage/AgentFormSuccessMessage';
import {CSSTransition} from 'react-transition-group';
import axios from 'axios';

class ListingPage extends Component {
  state = {
    agentData:null,
    modalWindowOpen:false,
    submissionSuccess:false,
    successPageVisible:false
  }

  handleSubmit = ()=>{
    this.setState({
      submissionSuccess:true
    })
    setTimeout(()=>{
      this.setState({
        modalWindowOpen:false
      })
    },1000)
  }

  async componentDidMount(){
    let agentId = await axios.get(`/api/listing/${this.props.location.state.listing.listing_id}/agent`)
    agentId = agentId.data[0].agent_id
    let agentData = await axios.get(`/api/agents/get?id=${agentId}`)
    agentData = agentData.data[0]
    this.setState({
      agentData
    },()=>console.log(this.state,"State after agent update"))
  }

  renderListingAgentContact = ()=>{
    if(this.state.agentData){
      return <ListingAgentContact onSubmit = {this.handleDesktopContactSubmit} openModal = {this.openModal} toggleModal = {this.toggleModal} agentData = {this.state.agentData}/>
    }else{
      return null
    }
  }

  handleDesktopContactSubmit = ()=>{
    this.setState({
      submissionSuccess:true,
      modalWindowOpen:true
    })
  }

  handleModalClick = (e)=>{
   e.stopPropagation()
  }

  toggleModal = ()=>{
    this.setState(prevState =>({
        modalWindowOpen:!prevState.modalWindowOpen
    }));
  }

  closeModal = ()=>{
    this.setState({
      modalWindowOpen:false,
    })
  }

  openModal = ()=>{
    this.setState({
      modalWindowOpen:true
    })
  }

  renderModalWindow = ()=>{
    if(this.state.agentData){
      if(window.innerWidth<900){
        console.log("rendering modal!!")
        return (
          <div>
            <ListingModal agent = {this.state.agentData} appear = {this.state.modalWindowOpen} toggleModal = {this.toggleModal} handleModalClick = {this.handleModalClick}>
              <span className = "listing-modal__ex-icon" onClick = {this.closeModal}> &#10005; </span>
              <CSSTransition
                in={!this.state.submissionSuccess}
                appear={false}
                timeout={300}
                unmountOnExit={true}
                classNames={{
                    exit: 'listing-page__modal-agent-contact--exit',
                    exitActive: 'listing-page__modal-agent-contact--exit-active',
                }}
              >
                <ListingAgentContact className = "listing-page__modal-agent-contact" onSubmit = {this.handleSubmit} openModal = {this.openModal} closeModal = {this.closeModal} toggleModal = {this.toggleModal} agentData ={this.state.agentData}/>
              </CSSTransition>
              <AgentFormSuccessPage agent ={this.state.agentData} appear = {this.state.submissionSuccess} submissionSuccess = {this.state.submissionSuccess}>
                <AgentFormSuccessMessage agent = {this.state.agentData} submissionSuccess = {this.state.submissionSuccess}/>
              </AgentFormSuccessPage>
            </ListingModal>
            <ModalBackdrop click = {this.closeModal} hidden = {!this.state.modalWindowOpen}/>
          </div>
        )
      }else if(window.innerWidth>=900){
        return(
          <div>
            <ListingModal agent = {this.state.agentData} appear = {this.state.modalWindowOpen} toggleModal = {this.toggleModal} handleModalClick = {this.handleModalClick}>
              <span className = "listing-modal__ex-icon" onClick = {this.closeModal}> &#10005; </span>
              <AgentFormSuccessMessage agent = {this.state.agentData} submissionSuccess = {this.state.submissionSuccess}/>
            </ListingModal>
            <ModalBackdrop click = {this.closeModal} hidden = {!this.state.modalWindowOpen}/>
          </div>
        )
      }
      }
  }

  render(){
    return (
        <div className = "listing-page" onClick = {this.props.handleClose}>
        <Nav/>
        <ListingHeader listing = {this.props.location.state.listing}/>
        <div className = "listing-page__container">
          <div className = "listing-page__grid-wrapper">
            <div className = "listing-page__image-carousel">
              <ListingPageSlider listing = {this.props.location.state.listing}/>
            </div>
            <div className = "listing-page__listing-data-table-container">
              <ListingDataTable data = {this.props.location.state.listing}/>
              {this.renderListingAgentContact()}
            </div>
          </div>
        </div>
        {this.renderModalWindow()}
        </div>
    );
  }
}

export default ListingPage;
