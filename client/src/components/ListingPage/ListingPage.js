import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import './ListingPage.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import ListingHeader from '../ListingHeader/ListingHeader';
import ListingPageSlider from '../ListingPageSlider/ListingPageSlider';
import ListingDataTable from '../ListingDataTable/ListingDataTable';
import ListingAgentContact from '../ListingAgentContact/ListingAgentContact';
import axios from 'axios';

class ListingPage extends Component {
  state = {

  }

  onWindowResize = ()=>{
    //this.setState({
    //  windowWidth:window.innerWidth
    //},()=>console.log(this.state,"new state"))
  }

  componentDidMount(){
    //window.addEventListener('resize',()=>this.onWindowResize())
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
                  <ListingAgentContact/>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default ListingPage;
