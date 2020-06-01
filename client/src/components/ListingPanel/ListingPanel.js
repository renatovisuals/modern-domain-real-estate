import React, { Component } from 'react';
import './ListingPanel.scss';
import Card from '../Widgets/Card/Card';
import axios from 'axios';

class ListingPanel extends Component {


  state = {
    markersInBounds:[],
    markerData:[],
    activeListing:null
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.markersInBounds !== nextProps.markersInBounds){
      return {
        markersInBounds: nextProps.markersInBounds
      }
    }
    if(prevState.activeListing !== nextProps.activeListing){
      return {
        activeListing:nextProps.activeListing
      }
    }
    return null
  }

  handleMouseEnter = (listingId)=>{
    this.props.handleListingMouseEnter(listingId)
    //this.setState
  }

  handleMouseLeave = ()=>{
    this.props.handleListingMouseLeave()
  }

  renderListings = ()=>{
    const listings = this.state.markersInBounds.map((marker)=>{
      let hover = this.state.activeListing === marker.id;
      return <Card
              className = {`listing-panel__listing ${hover ? 'hover':null}`}
              type="listing"
              data = {marker.listingData}
              imagePath = {`url("/images/listings/${marker.listingData.listing_id}/1.jpg")`}
              key = {marker.listingData.listing_id}
              id = {marker.listingData.listing_id}
              onMouseEnter = {()=>this.handleMouseEnter(marker.listingData.listing_id)}
              onMouseLeave = {this.handleMouseLeave}
             />
    })
    console.log(this.state.markersInBounds,"LISTINGS")
    return listings
  }

  render(){

    return(
      <div className= "listing-panel">
        <div className = "listing-panel__listing-container">
            {this.renderListings()}
        </div>
      </div>
    )
  }
}

export default ListingPanel;
