import React, { Component } from 'react';
import './Listings.scss';
import axios from 'axios';

class Listings extends Component {


  state = {
    markersInBounds:[],
    markerData:[]
  }

  getAllListings = async ()=>{
    axios.get(`/api/listings/get/`).then((res)=>{
      this.setState({
        markerData: res.data
      },()=>console.log(this.state.markerData, "MARKER DAAATA"));
    });

    //return res.data
  }

  componentDidMount(){
    this.getAllListings()
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
      return <div className = "listings__listing"> {marker.listingData.formatted_address} </div>
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
