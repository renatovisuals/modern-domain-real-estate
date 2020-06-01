import React, { Component } from 'react';
import ListingPageNav from '../ListingPageNav/ListingPageNav';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import './MainListingPage.scss';
import Listing from '../Listing/Listing';
import ListingPanel from '../ListingPanel/ListingPanel';
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
      activeListing:null,
      currentListingData:null,
      mapHeight:null,
      mapWidth:null,
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

  setActiveListing = (activeListing)=>{
    this.setState({
      activeListing
    },()=>console.log(this.state.activeListing,"HELLO"))
  }

  removeActiveListing = ()=>{
    this.setState({
      activeListing:null
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
          })
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
    }
  }

  componentDidUpdate(prevProps,prevState){
    const {locations,agents,addresses} = this.state.searchResults;
    if(this.state.search){
      if(locations && locations.length>0){
        this.getListingsByLocationNameId(this.state.searchResults.locations[0].item.name_id)
      }else if(addresses && addresses.length>0){
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
    this.setState({
      searchQuery:''
    })
  }

  handleResultClick = (result)=>{
    if(result.type === "location"){
      this.getListingsByLocationId(result.id)
    }else if(result.type ==="agent"){

    }
  }

  updateMapDimensions = ()=>{
    const navHeight =document.getElementById('nav').getBoundingClientRect().height;
    const nav = document.getElementById('nav');
    const listingPanelWidth = document.getElementById('listing-panel').getBoundingClientRect().width;
    let mapHeight = window.innerHeight - (navHeight || 0);
    let mapWidth = window.innerWidth - listingPanelWidth;
    this.setState({
      mapHeight,
      mapWidth
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
    axios.get(`/api/listing/getbylocationnameid/${nameId}`).then((res)=>{
      this.setState({
        markerData:res.data
      })
    });

    //return res.data
    /*let res = await axios.get(`/api/listing/getbylocationnameid/${nameId}`);
    this.setState({
      markerData: res.data
    });
    return res.data*/
  }

  getListingsByLocationId = async (id)=>{
    axios.get(`/api/listing/getbylocationid/${id}`).then((res)=>{
      this.setState({
        markerData:res.data
      })
    })

    //console.log(res.data,"this is the response")
    //return res.data

    /*let res = await axios.get(`/api/listings/getbylocationid/${id}`);
    this.setState({
      markerData: res.data
    });
    console.log(res.data,"this is the response")
    return res.data */
  }

  getListingsByAddressId = async (id)=>{
    axios.get(`/api/listing/getbyaddressid/${id}`).then((res)=>{
    this.setState({
        markerData:res.data
      },console.log(this.state.markerData,"new data"));
    })
  }

  getAllListings = async ()=>{
    axios.get(`/api/listing/get/`).then((res)=>{
      const test = res.data;
        this.setState({
          markerData: res.data
        });
    });
  }

  componentDidMount(){
    window.scrollTo(0,0);
    if(this.props.match.params.location){
      this.getListingsByLocationNameId(this.props.match.params.location)
    }else{
      this.getAllListings()
    }
    this.updateMapDimensions();
    this.mapIsVisible();
    window.addEventListener("resize",this.updateMapDimensions);
    window.addEventListener("resize",this.mapIsVisible);
  }


  componentWillUnmount(){
    window.removeEventListener("resize",this.updateMapDimensions);
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
        <div className = "listing-page__map-container" style={{height:`${this.state.mapHeight}px`,width:`${this.state.mapWidth}px`}}>
          {this.state.mapIsVisible && this.state.markerData
            ? <Map
                id="myMap"
                options={mapOptions}
                data = {this.state.markerData}
                getListing = {this.getListingData}
                onMapMove = {this.onMapMove}
                markersInBounds = {this.state.markersInBounds}
                setMarkersInBounds = {(markersInBounds)=>this.setMarkersInBounds(markersInBounds)}
                activeListing = {this.state.activeListing}
                setActiveListing = {(listingId)=>this.setActiveListing(listingId)}
                removeActiveListing = {(listingId)=>this.removeActiveListing(listingId)}
              />
            : null
          }
        </div>

        <div id = "listing-panel" className = "listing-page__listing-panel" style={{height:`${this.state.mapHeight}px`}}>
          <ListingPanel
           markerData = {this.state.markerData}
           mapIsVisible = {this.state.mapIsVisible}
           markersInBounds = {this.state.markersInBounds}
           handleListingMouseEnter = {(listingId)=> this.setActiveListing(listingId)}
           handleListingMouseLeave = {this.removeActiveListing}
           activeListing = {this.state.activeListing}
          />
        </div>
      </div>
    )
  }
}

export default MainListingPage;
