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
import {stringToSqft} from '../../utils';
import {camelize} from '../../utils';
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
      bedrooms:'',
      bathrooms:'',
      minPrice:'',
      maxPrice:'',
      minSqft:'',
      maxSqft:'',
      minLotSize:'',
      maxLotSize:'',
      propertyTypes:[],
      amentities:[],
      singleFamily:false,
      apartment:false,
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
    if(result.type === "location"){
      this.getListingsByLocationNameId(result.data.name_id)
      this.props.history.push(`/listings/for-sale/${result.data.name_id}/`)
    }else if(result.type ==="agent"){
      this.props.history.push(`/agents/${result.data.first_name.toLowerCase() + "-" + result.data.last_name.toLowerCase()}/${result.data.agent_id}`)
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
    this.filterListingData()
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
    e.persist()
    let name = e.target.name;
    let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let parsedSearch = queryString.parse(this.props.location.search,{parseNumbers:true,arrayFormat:'comma'})
    this.setState({
      [name]:value
    },()=>handleChange())

    const handleChange = ()=>{
      const filterState = {
        ...this.state
      }
      if(e.target.type === "checkbox"){
        const category = e.target.dataset.category;
        if(e.target.checked){
          if(Array.isArray(filterState[category])){
            const values = new Set([...filterState[category]])
            values.add(e.target.value)
            filterState[category] = Array.from(values);
            parsedSearch[category] = filterState[category]
          }
        }else{
          if(Array.isArray(filterState[category])){
            const index = filterState[category].indexOf(e.target.value)
            if(index!== -1){
              filterState[category].splice(index,1)
              parsedSearch[category] = filterState[category]
            }
          }
        }
      }else{
        if(e.target.value === ""){
          delete parsedSearch[name]
        }else{
          parsedSearch[name] = value;
        }
        filterState[name] = value
      }
      let newHistory = queryString.stringify(parsedSearch,{arrayFormat:'comma'})
      this.props.history.push({
        search:newHistory
      })
      this.setState({
        ...filterState
      },()=>this.filterListingData())
    }


  }

  getInitialListingFilterState = ()=>{
    let search = queryString.parse(this.props.location.search,{arrayFormat:'comma'});
    for(let param in search){
      if(param === 'bedrooms' || param === 'bathrooms' || param === 'minPrice' || param === 'maxPrice'){
        search[param]= parseFloat(search[param])
      }
      if(param === 'propertyTypes' || param === 'amentities'){
        if(!Array.isArray(search[param])){
          if(search[param]!==null){
            search[param] = [search[param]]
          }else if(search[param]===null){
            search[param] = []
          }
        }
        search[param].forEach((val)=>{
          search[camelize(val)] = true
        })
      }
    }


    this.setState({
      ...search
    },()=>this.filterListingData())
  }

  resetFilterState = (filterState)=>{
    let search = queryString.parse(this.props.location.search,{arrayFormat:'comma'});
    for(let i in filterState){
      delete search[i]
    }
    search = queryString.stringify(search,{arrayFormat:'comma'})
    this.props.history.push({
      search:search
    })
    this.setState({
      ...filterState
    },()=>this.filterListingData())
  }

  filterListingData = ()=>{
    let markerData = [...this.state.markerData];
    markerData = markerData.filter((data)=>{
       const dataLotSizeString = `${data.lot_quantity} ${data.lot_unit}`

       if (this.state.bathrooms && data.bathrooms<parseFloat(this.state.bathrooms)){
         return false
       }
       if (this.state.bedrooms && data.bedrooms<parseFloat(this.state.bedrooms)){
         return false
       }
       if (this.state.minPrice && data.price < parseFloat(this.state.minPrice)){
         return false
       }
       if (this.state.maxPrice && data.price > parseFloat(this.state.maxPrice)){
         return false
       }
       if (this.state.minLotSize && stringToSqft(dataLotSizeString) < stringToSqft(this.state.minLotSize)){
         return false
       }
       if (this.state.maxLotSize && stringToSqft(dataLotSizeString) > stringToSqft(this.state.maxLotSize)){
         return false
       }
       if (this.state.minSqft && data.sqft < parseFloat(this.state.minSqft)){
         return false
       }
       if (this.state.maxSqft && data.sqft > parseFloat(this.state.maxSqft)){
         return false
       }
       if (this.state.minYear && data.year_built < parseFloat(this.state.minYear)){
         return false
       }
       if (this.state.maxYear && data.year_built < parseFloat(this.state.maxYear)){
         return false
       }
       if(this.state.propertyTypes.length > 0){
         let isMatched = false
         for(let i = 0; i< this.state.propertyTypes.length; i++){
           if(this.state.propertyTypes[i] === data.building_type){
             isMatched = true;
             break;
           }
         }
         if(!isMatched) return false
       }
       if(this.state.amentities.length > 0){
         for(let i = 0; i< this.state.amentities.length; i++){
           const amentity = camelize(this.state.amentities[i])
           if(data[amentity]!== 1){
             return false
           }
         }
       }
        return true
    })
    this.setState({
      filteredData:markerData
    })
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
           mapHeight = {this.state.mapHeight}
           resetFilter = {(filterState)=>this.resetFilterState(filterState)}
           >
          </ListingPanel>
        </div>
      </div>
    )
  }
}

export default MainListingPage;
