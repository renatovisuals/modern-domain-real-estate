import React, { Component } from 'react';
import Slider from "react-slick";
import './ListingPageSlider.scss';
import axios from 'axios';

class ListingPage extends Component {

  state = {
    //listing:null
  }

  render(){
    return (
        <div className = "listing" onClick = {this.props.handleClose}>

        </div>
    );
  }
}

export default ListingPage;
