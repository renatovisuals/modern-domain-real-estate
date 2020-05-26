import React, { Component } from 'react';
import './Listings.scss';
import axios from 'axios';

class Listings extends Component {


  state = {
    markersInBounds:[]
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.markersInBounds !== nextProps.markersInBounds){
      return {
        markersInBounds: nextProps.markersInBounds
      }
    }
    return null
  }

  renderListings = ()=>{
    const listings = this.state.markersInBounds.map((marker)=>{
      return <div className = "listings__listing"> {marker.listingData.address_id} </div>
    })
    console.log(this.state.markersInBounds,"LISTINGS")
    return listings
  }

  render(){

    return(
      <div className="listings">
        {this.renderListings()}
      </div>
    )
  }
}

export default Listings;
