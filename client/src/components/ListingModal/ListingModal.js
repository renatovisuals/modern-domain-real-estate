import React, { Component } from 'react';
import AgentFormSuccessPage from '../AgentFormSuccessPage/AgentFormSuccessPage';
import ListingAgentContact from '../ListingAgentContact/ListingAgentContact';
import {CSSTransition} from 'react-transition-group';
import './listing-modal.scss';


class ListingModal extends Component {

  state = {
    submissionSucesss:false
  }

  componentDidMount(){
    if(!this.state.submissionSuccess){
      setTimeout(()=>{
        this.setState({
          submissionSuccess:true
        })
      },1000)
    }
  }

  getInitialState = ()=>{
    return(
      {

      }
    )
  }

  handleModalClose = ()=>{
    this.props.toggleModal()
  }

  render(){
    return(
      <CSSTransition
        in={this.props.appear}
        appear={true}
        timeout={300}
        unmountOnExit={true}
        classNames={{
            appear:'listing-modal--appear',
            appearActive:'listing-modal--appear-active',

            enter: 'listing-modal--enter',
            enterActive: 'listing-modal--enter-active',
            enterDone: 'listing-modal--enter-done',

            exit: 'listing-modal--exit',
            exitActive: 'listing-modal--exit-active',
            exitDone: 'listing-modal--exit-done'
        }}
        >
        <div ref={listingModal=> this.listingModal = listingModal} className = "listing-modal" onClick = {(e)=>{this.props.handleModalClick(e)}}>
          {this.props.children}
        </div>
      </CSSTransition>
    )
  }
}

export default ListingModal;
