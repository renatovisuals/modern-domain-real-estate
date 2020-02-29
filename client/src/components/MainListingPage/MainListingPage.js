import React, { Component } from 'react';
import NavWithSearch from '../NavWithSearch/NavWithSearch'
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import './MainListingPage.scss';
import Listing from '../Listing/Listing';
import Map from '../Map/Map';
import { mapStyles } from '../../utils';
import axios from 'axios';


class MainListingPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      markerData:'',
      showCurrentListing:false,
      currentListingData:null,
      mapHeight:null,
      mapIsVisible:false,
      map:2,
      searchQuery:'',
      searchResults:[]
    }
    this.getListingData = this.getListingData.bind(this);
    this.closeListing = this.closeListing.bind(this);
  }

  handleSearchInput = (e)=>{
    this.setState({
      searchQuery:e.target.value,
      searchResults:[]
    })
    if(e.target.value.length>=2)this.getSearchResults(e)
  }

  getSearchResults = async (e)=>{
    let res = await axios.get(`/api/locations/get?searchQuery=${e.target.value}`);
    this.setState({
      searchResults:res.data
    })
  }

  handleLocationClick = (locationId)=>{
    this.getListingsByLocationId(locationId)
    console.log(locationId,"THIS IS THE LOCATION ID");
  }

  updateMapHeight = ()=>{
    const navHeight =document.getElementById('nav').clientHeight;
    let mapHeight = window.innerHeight-(navHeight || 0);
    this.setState({
      mapHeight
    })
  }

  mapIsVisible = ()=>{
    this.setState({
      mapIsVisible:window.innerWidth>768
    })
  }

  renderMap = ()=>{
    if(this.state.mapIsVisible){
      return(
        null
      )
    }
  }

  onMapMove = (mapBounds)=>{
    let boundsString = JSON.stringify(mapBounds)
  }

  getListingsByLocationNameId = async (nameId)=>{
    let res = await axios.get(`/api/listings/getbylocationnameid/${nameId}`);
    this.setState({
      markerData: res.data
    });
    return res.data
  }

  getListingsByLocationId = async (id)=>{
    let res = await axios.get(`/api/listings/getbylocationid/${id}`);
    this.setState({
      markerData: res.data
    });
    console.log(res.data,"this is the response")
    return res.data
  }

  getAllListings = async ()=>{
    let res = await axios.get(`/api/listings/get/`);
    this.setState({
      markerData: res.data
    });
    return res.data
  }

  componentDidMount(){
    window.scrollTo(0,0);
    if(this.props.match.params.location){
      this.getListingsByLocationNameId(this.props.match.params.location)
    }else{
      this.getAllListings()
    }

    this.updateMapHeight();
    this.mapIsVisible();
    window.addEventListener("resize",this.updateMapHeight);
    window.addEventListener("resize",this.mapIsVisible);
  }

  componentWillUnmount(){
    window.removeEventListener("resize",this.updateMapHeight);
    window.removeEventListener("resize",this.mapIsVisible);
  }


  closeListing(){
      this.setState({
          showCurrentListing:false
      })
  }

  getListingData(marker){
      let listingData = this.state.markerData.filter((data)=>{
          return data.id === marker.id
      })
      this.setState({
          currentListingData:listingData[0],
          showCurrentListing:true
      })
  }

  render(){
    const mapOptions = {
      //center:{lat:40.7128,lng:-74.0060},
      zoom:8,
      styles: mapStyles()
    }

    return(
      <div className="listing-page">
        <NavWithSearch
          handleSearchInput = {(e)=> this.handleSearchInput(e)}
          searchQuery = {this.state.searchQuery}
          results = {this.state.searchResults}
          handleLocationClick = {(locationId)=>this.handleLocationClick(locationId)}
        />
        {this.state.showCurrentListing
          ? <Listing listingData = {this.state.currentListingData} handleClose = {this.closeListing}/>
          : null
        }
        {this.state.mapIsVisible && this.state.markerData
          ? <div className = "listing-page__map-container" style={{height:`${this.state.mapHeight}px`}}>
            <Map id="myMap" options={mapOptions} data = {this.state.markerData} getListing = {this.getListingData} onMapMove = {this.onMapMove}/>
            </div>
          :null
        }
      </div>
    )
  }
}

export default MainListingPage;
