import React, { Component } from 'react';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import Select from '../Widgets/Select/Select';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import './MainListingPage.scss';
import markerData from '../../maphomesdb';
import Listing from '../Listing/Listing';
import Map from '../Map/Map';
import { mapStyles } from '../../utils';


class MainListingPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      markerData:markerData(),
      showCurrentListing:false,
      currentListingData:null
    }
    this.getListingData = this.getListingData.bind(this);
    this.closeListing = this.closeListing.bind(this);
  }

  componentDidMount(){
    window.scrollTo(0,0);
    const string = this.props.location.search;
    const parsed = queryString.parse(string);
    this.setState({

    })
  }

  closeListing(){
        this.setState({
            showCurrentListing:false
        })
        console.log('listing is closed')
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
      center:{lat:32.7547,lng:-97.3614},
      zoom: 8,
      styles: mapStyles(),
    }

    return(
      <div className="App">
        {this.state.showCurrentListing
          ? <Listing listingData = {this.state.currentListingData} handleClose = {this.closeListing}/>
          : null
        }
        <div className = "map-container">
          <Map id="myMap" options={mapOptions} data = {this.state.markerData} getListing = {this.getListingData}/>
        </div>
      </div>
    )
  }
}

export default MainListingPage;
