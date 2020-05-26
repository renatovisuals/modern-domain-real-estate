import React, { Component } from 'react';
import ListingPageNav from '../ListingPageNav/ListingPageNav';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import './MainListingPage.scss';
import Listing from '../Listing/Listing';
import Listings from '../Listings/Listings';
import Map from '../Map/Map';
import { mapStyles } from '../../utils';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class MainListingPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      markerData:'',
      markersInBounds:[],
      showCurrentListing:false,
      currentListingData:null,
      mapHeight:null,
      mapIsVisible:false,
      map:2,
      searchQuery:'',
      searchResults:[],
      search:false,
      listingsToShow:[],
      mobileWidth:768
    }
    this.getListingData = this.getListingData.bind(this);
    this.closeListing = this.closeListing.bind(this);
  }

  setMarkersInBounds = (markersInBounds)=>{
    this.setState({
      markersInBounds
    })
  }

  //getListingsToShow = ()=>{
  //  const listingsToShow = this.state.markersInBounds.map((marker)=>marker.listingData)
  //  this.setState({
  //    listingsToShow
  //  }, console.log(this.state.listingsToShow, "Showing current listings"))
  //}

  handleSearchInput = (e)=>{
    this.setState({
      searchQuery:e.target.value,
      searchResults:[]
    })
    this.getSearchResults(e)
  }

  handlePressEnter = ()=>{
    if(this.state.searchQuery.trim().length>=1){
      this.setState({
        search:true
      },this.handleSearch())
    }
  }

  handleSearch = ()=>{
    if(this.state.search){
      if(this.state.searchResults.locations && this.state.searchResults.locations.length>0){
        this.setState({
          search:false
        })
        return <Redirect to = {`/listings/for-sale/${this.state.searchResults.locations[0].item.name_id}`}/>
      }
      else if(this.state.searchResults.addresses && this.state.searchResults.addresses.length>0){
        this.setState({
          search:false
        })
        const listings = this.getListingsByAddressId(this.state.searchResults.addresses[0].item.address_id)
        listings.then((res)=>{
          this.setState({
            markerData:res
          },()=>console.log(this.state.markerData,"marker data"))
        })
      }
      else if(this.state.searchResults.agents && this.state.searchResults.agents.length>0){
        this.setState({
          search:false
        })
        const {first_name,last_name} = this.state.searchResults.agents[0].item;
        const nameQuery = `${first_name.toLowerCase()}-${last_name.toLowerCase()}`
        return <Redirect to = {`/agents/${nameQuery}/${this.state.searchResults.agents[0].item.agent_id}`}/>
      }
      console.log("your search matched no results")
    }
  }

  componentDidUpdate(prevProps,prevState){
    const {locations,agents,addresses} = this.state.searchResults;
    //console.log(addresses,"addresses")
    if(this.state.search){
      console.log("working")
      if(locations && locations.length>0){
        this.getListingsByLocationNameId(this.state.searchResults.locations[0].item.name_id)
      }else if(addresses && addresses.length>0){
        console.log(this.state.searchResults.addresses,"ADRESSES")
        this.getListingsByAddressId(this.state.searchResults.addresses[0].item.address_id)
        //this.getListingsByLocationNameId(this.state.searchResults.addresses[0].item.name_id)
      }
      this.setState({
        search:false
      })
    }
  }

  getSearchResults = async (e)=>{
    let res = await axios.get(`/api/search/get?search_query=${e.target.value}`);
    this.setState({
      searchResults:res.data
    })
  }

  clearSearch = ()=>{
    console.log("search cleared!!")
    this.setState({
      searchQuery:''
    })
  }

  handleResultClick = (result)=>{
    console.log(`handle result called`)
    if(result.type === "location"){
      this.getListingsByLocationId(result.id)
      console.log(result.id,"THIS IS THE LOCATION ID");
    }else if(result.type ==="agent"){
      console.log("retreiving agent info")
    }
  }

  updateMapHeight = ()=>{
    const navHeight =document.getElementById('nav').getBoundingClientRect().height;
    const nav = document.getElementById('nav');
    let mapHeight = window.innerHeight-(navHeight || 0);
    this.setState({
      mapHeight
    })
  }

  mapIsVisible = ()=>{
    this.setState({
      mapIsVisible:window.innerWidth>this.state.mobileWidth
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

  getListingsByAddressId = async (id)=>{
    let res = await axios.get(`/api/listings/getbyaddressid/${id}`);
    const test = res.data
    this.setState({
      markerData:test
    });
    console.log(res.data,"this is the response for address")
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
        {this.handleSearch()}
        <ListingPageNav
          handleSearchInput = {(e)=> this.handleSearchInput(e)}
          searchQuery = {this.state.searchQuery}
          results = {this.state.searchResults}
          handleResultClick = {(result)=>this.handleResultClick(result)}
          clearSearch = {this.clearSearch}
          handlePressEnter = {this.handlePressEnter}
        />
        {this.state.showCurrentListing
          ? <Listing listingData = {this.state.currentListingData} handleClose = {this.closeListing}/>
          : null
        }
        <div className = "listing-page__map-container" style={{height:`${this.state.mapHeight}px`}}>
          {this.state.mapIsVisible && this.state.markerData
            ? <Map
                id="myMap"
                options={mapOptions}
                data = {this.state.markerData}
                getListing = {this.getListingData}
                onMapMove = {this.onMapMove}
                markersInBounds = {this.state.markersInBounds}
                setMarkersInBounds = {(markersInBounds)=>this.setMarkersInBounds(markersInBounds)}
              />
            : null
          }
        </div>

        <div className = "listing-page__listing-container" style={{height:`${this.state.mapHeight}px`}}>
          <Listings markerData = {this.state.markerData} markersInBounds = {this.state.markersInBounds}/>
        </div>
      </div>
    )
  }
}

export default MainListingPage;
