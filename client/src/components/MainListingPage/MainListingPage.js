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
      filteredData:'',
      markersInBounds:[],
      showCurrentListing:false,
      activeListing:null,
      currentListingData:null,
      mapHeight:null,
      mapWidth:null,
      mapBounds:true,
      searchResultsVisible:true,
      mapIsVisible:false,
      searchQuery:'',
      searchResults:[],
      search:false,
      listingsToShow:[],
      mobileWidth:768,
      bedrooms:0,
      bathrooms:0,
      minPrice:0,
      maxPrice:200000000,
      propertyTypes:[],
      singleFamily:false
    }
    this.getListingData = this.getListingData.bind(this);
    this.closeListing = this.closeListing.bind(this);
  }

  //onSearchBarChange = (value)=>{
  //  this.setState({
  //    listingSearchBarValue:value
  //  })
  //}

  setMarkersInBounds = (markersInBounds)=>{
    this.setState({
      markersInBounds
    })
  }

  setActiveListing = (activeListing)=>{
    this.setState({
      activeListing
    })
  }

  removeActiveListing = ()=>{
    this.setState({
      activeListing:null
    })
  }

  handleSearchInput = (e)=>{
    this.setState({
      searchQuery:e.target.value,
      searchResults:[]
    })
    this.showListingSearchResults()
    this.getSearchResults(e)
  }

  handlePressEnter = ()=>{
    if(this.state.searchQuery.trim().length>=1){
      this.setState({
        search:true
      },this.handleSearch())
    }else if (this.state.searchQuery.trim().length === 0){
      this.props.history.push(`/listings/for-sale/_map/${this.props.history.location.search}`)
      console.log(this.props.history.location.search,"SEARCH")
      this.getAllListings()
    }
  }

  handleSearch = ()=>{
    if(this.state.search){
      if(this.state.searchResults.locations && this.state.searchResults.locations.length>0){
        this.setState({
          search:false,
          searchQuery:this.state.searchResults.locations[0].item.name
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
    console.log("handle result click called!")
    if(result.type === "location"){
      this.getListingsByLocationNameId(result.id)
      this.props.history.push(`/listings/for-sale/${result.id}/`)
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

  updateMapBounds = (bounds)=>{
    bounds = [bounds.north,bounds.east,bounds.south,bounds.west]
    let search = queryString.parse(this.props.location.search,{arrayFormat:'comma'})
    search.mapBounds = bounds
    this.props.history.push({
      search:queryString.stringify(search,{arrayFormat:'comma'})
    })
  }

  mapIsVisible = ()=>{
    this.setState({
      mapIsVisible:window.innerWidth>this.state.mobileWidth
    })
  }

  hideListingSearchResults = ()=>{
    this.setState({
      searchResultsVisible:false
    })
  }

  showListingSearchResults = ()=>{
    this.setState({
      searchResultsVisible:true
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

  getListingsByLocationNameId = async (nameId,callback)=>{
    axios.get(`/api/listing/getbylocationnameid/${nameId}`).then((res)=>{
      this.setState({
        markerData:res.data,
        filteredData:res.data
      },()=>{if(callback)callback()})
    });
  }

  getLocationByNameId = async (id)=>{
    axios.get(`/api/listing/getbylocationid/${id}`).then((res)=>{
      return res.data
    })
  }

  getListingsByLocationId = async (id)=>{
    axios.get(`/api/listing/getbylocationid/${id}`).then((res)=>{
      this.setState({
        markerData:res.data,
        filteredData:res.data
      })
    })
  }

  getListingsByAddressId = async (id)=>{
    axios.get(`/api/listing/getbyaddressid/${id}`).then((res)=>{
    this.setState({
        markerData:res.data,
        filteredData:res.data
      });
    })
  }

  getAllListings = async (callback)=>{
    axios.get(`/api/listing/get/`).then((res)=>{
      const test = res.data;
        this.setState({
          markerData: res.data,
          filteredData:res.data
        },()=>{if(callback)callback()});
    });
  }

  async componentDidMount(){
    window.scrollTo(0,0);
    if(this.props.match.params.location){
      this.getListingsByLocationNameId(this.props.match.params.location,this.getInitialListingFilterState)
      let locationName = await axios.get(`/api/locations/get?name_id=${this.props.match.params.location}`)
      locationName = locationName.data[0].name
      this.setState({
        searchQuery:locationName,
        searchResultsVisible:false
      })
    }else{
      this.getAllListings(this.getInitialListingFilterState)
    }
    this.updateMapDimensions();
    this.mapIsVisible();
    window.addEventListener("resize",this.updateMapDimensions);
    window.addEventListener("resize",this.mapIsVisible);
  }

  handleFilterInputChange = (e)=>{
    let name,value;
    let filterState = {
      ...this.state
    }
    let parsedSearch = queryString.parse(this.props.location.search,{arrayFormat:'comma'})
    console.log(parsedSearch,"PARSED")
    let arr;
    if(parsedSearch[e.target.name]){
      if(Array.isArray(parsedSearch[e.target.name])){
        arr = parsedSearch[e.target.name]
      }else{
        arr = [parsedSearch[e.target.name]]
      }

    }else{
      arr = []
    }
    console.log(arr,"ARRR")
    if(e.target.type === "checkbox"){
      if(e.target.checked){
        arr.push(e.target.value)
      }else{
        let index = arr.indexOf(e.target.value)
        if(index !== -1){
          console.log(index,"removing from array")
          arr.splice(index,1)
        }

      }
      parsedSearch[e.target.name] = arr;
    }

    let newHistory = queryString.stringify(parsedSearch,{arrayFormat:'comma'})
    this.props.history.push({
      search:newHistory
    })

    console.log(parsedSearch)
    /*
    if(e.target.type === 'checkbox'){

    }
    let filterState = {
      ...this.state
    }
    let parsedSearch = queryString.parse(this.props.location.search,{arrayFormat:'comma'})
    if(name === 'minPrice' && parseFloat(value) === 0){
      delete parsedSearch[name]
    }else if(name === 'maxPrice' && parseFloat(value) === 200000000){
      delete parsedSearch[name]
    }else{
      parsedSearch[name] = value;
    }
    filterState[name] = value;
    let newHistory = queryString.stringify(parsedSearch,{arrayFormat:'comma'})
    console.log(newHistory,"NEW HISTORY")
    this.props.history.push({
      search:newHistory
    })
    this.setState({
      ...filterState
    },()=>this.filterListingData())
    */
  }

  getInitialListingFilterState = ()=>{
    //if(!this.state.filteredData){
    //  this.setState({
    //    filteredData:this.state.markerData
    //  },()=>this.getInitialListingFilterState())
    //  return
    //}
    let search = queryString.parse(this.props.location.search,{arrayFormat:'comma'});
    for(let param in search){
      if(param === 'bedrooms' || param === 'bathrooms' || param === 'minPrice' || param === 'maxPrice'){
        search[param]= parseFloat(search[param])
      }
    }
    this.setState({
      ...search
    },()=>this.filterListingData())
  }

  filterListingData = ()=>{
    let markerData = [...this.state.markerData];
    markerData = markerData.filter((data)=>{
       if ((data.bathrooms<parseFloat(this.state.bathrooms) || data.bedrooms<parseFloat(this.state.bedrooms))){
         return false
       }
       if (data.price < parseFloat(this.state.minPrice)){
         return false
       }
       if (data.price > parseFloat(this.state.maxPrice)){
         return false
       }
        return true
    })
    this.setState({
      filteredData:markerData
    },()=>console.log(this.state, "NEW DATA"))
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
      center:{lat: -34.397, lng: 150.644},
      zoom:8,
      styles: mapStyles(),
      minZoom:4
    }

    return(
      <div className="listing-page">
        {this.handleSearch()}
        <ListingPageNav
          handleSearchInput = {(e)=> this.handleSearchInput(e)}
          searchQuery = {this.state.searchQuery}
          resultsVisible = {this.state.searchResultsVisible}
          results = {this.state.searchResults}
          handleResultClick = {(result)=>this.handleResultClick(result)}
          clearSearch = {this.clearSearch}
          handlePressEnter = {this.handlePressEnter}
          hideListingSearchResults = {this.hideListingSearchResults}
        />
        {this.state.showCurrentListing
          ? <Listing listingData = {this.state.currentListingData} handleClose = {this.closeListing}/>
          : null
        }
        <div className = "listing-page__map-container" style={{height:`${this.state.mapHeight}px`,width:`${this.state.mapWidth}px`}}>
          {this.state.mapIsVisible && this.state.filteredData
            ? <Map
                id="myMap"
                options={mapOptions}
                data = {this.state.filteredData}
                getListing = {this.getListingData}
                onMapMove = {this.onMapMove}
                markersInBounds = {this.state.markersInBounds}
                setMarkersInBounds = {(markersInBounds)=>this.setMarkersInBounds(markersInBounds)}
                updateMapBounds = {(bounds)=>this.updateMapBounds(bounds)}
                mapBounds = {true}
                activeListing = {this.state.activeListing}
                setActiveListing = {(listingId)=>this.setActiveListing(listingId)}
                removeActiveListing = {(listingId)=>this.removeActiveListing(listingId)}
                state = {this.state}
              />
            : null
          }
        </div>

        <div id = "listing-panel" className = "listing-page__listing-panel" style={{height:`${this.state.mapHeight}px`}}>
          <ListingPanel
           markerData = {this.state.filteredData}
           mapIsVisible = {this.state.mapIsVisible}
           markersInBounds = {this.state.markersInBounds}
           handleListingMouseEnter = {(listingId)=> this.setActiveListing(listingId)}
           handleListingMouseLeave = {this.removeActiveListing}
           activeListing = {this.state.activeListing}
           updateMapDimensions = {this.updateMapDimensions}
           handleChange = {(name,value,e)=>this.handleFilterInputChange(name,value,e)}
           filterState = {this.state}
           >
          </ListingPanel>
        </div>
      </div>
    )
  }
}

export default MainListingPage;
