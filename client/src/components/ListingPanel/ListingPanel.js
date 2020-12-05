import React, { Component } from 'react';
import './ListingPanel.scss';
import Card from '../Widgets/Card/Card';
import axios from 'axios';
import ListingPanelFilter from '../ListingPanelFilter/ListingPanelFilter';
import { withRouter } from 'react-router-dom';


class ListingPanel extends Component {
  state = {
    markersInBounds:[],
    markerData:[],
    activeListing:null,
    mapIsVisible:false,
    listingsAreVisible:true,
    filterDrawerIsOpen:false,
    filterDrawerIsTransitioning:false
  }

  componentDidMount(){
    //setTimeout(()=>{
    //  this.props.updateMapDimensions()
    //},100)
  }

  setFilterDrawerTransitionState = (bool,callback)=>{
    this.setState({
      filterDrawerIsTransitioning:bool
    },()=>{if(callback)callback()})
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
    if(prevState.markerData !== nextProps.markerData){
      return {
        markerData: nextProps.markerData
      }
    }
    return null
  }

  toggleFilterDrawer = (callback)=>{
    const filterDrawerIsOpen = !this.state.filterDrawerIsOpen
    this.setState({
      filterDrawerIsOpen
    },()=>{if(callback)callback()})
  }

  toggleViewListings = ()=>{
    const listingsAreVisible = !this.state.listingsAreVisible;
    this.setState({
      listingsAreVisible
    })
  }

  handleMouseEnter = (listingId)=>{
    this.props.handleListingMouseEnter(listingId)
    //this.setState
  }

  handleMouseLeave = ()=>{
    this.props.handleListingMouseLeave()
  }

  renderListings = ()=>{
    let listingData = [];
    let imagePath;
    if(this.props.mapIsVisible){
      listingData = this.state.markersInBounds;
      const listings = listingData.map((marker)=>{
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
                onClick = {()=> this.props.viewListing(marker.listingData)}
               />
      })
      return listings

    }else{
      if(this.state.markerData){
        listingData = this.state.markerData;
        const listings = listingData.map((listing)=>{
          let hover = this.state.activeListing === listing.listing_id;
          return <Card
                  className = {`listing-panel__listing ${hover ? 'hover':null}`}
                  type="listing"
                  data = {listing}
                  imagePath = {`url("/images/listings/${listing.listing_id}/1.jpg")`}
                  key = {listing.listing_id}
                  id = {listing.listing_id}
                  onMouseEnter = {()=>this.handleMouseEnter(listing.listing_id)}
                  onMouseLeave = {this.handleMouseLeave}
                  onClick = {()=> this.props.viewListing(listing)}
                 />
        })
        return listings
      }
    }
  }

  render(){
    return(
      <div id = "listing-panel" className= {`listing-panel ${this.state.filterDrawerIsTransitioning ? "disable-scroll" : ""}`}>
        <ListingPanelFilter
          toggleFilterDrawer = {(callback)=>this.toggleFilterDrawer(callback)}
          filterDrawerIsOpen = {this.state.filterDrawerIsOpen}
          toggleViewListings = {this.toggleViewListings}
          handleChange = {(name,value,e)=>this.props.handleChange(name,value,e)}
          filterState = {this.props.filterState}
          mapHeight = {this.props.mapHeight}
          setFilterDrawerTransitionState = {(bool,callback)=>this.setFilterDrawerTransitionState(bool,callback)}
          filterDrawerIsTransitioning = {this.state.filterDrawerIsTransitioning}
          resetFilter = {(filterState)=>this.props.resetFilter(filterState)}
        />
        {this.state.listingsAreVisible ?
          <div className = "listing-panel__listing-container">
              {this.renderListings()}
          </div>
        :
        null}
      </div>
    )
  }
}

export default withRouter(ListingPanel);
