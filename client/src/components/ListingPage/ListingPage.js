import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import './ListingPage.scss';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import ListingHeader from '../ListingHeader/ListingHeader';
import axios from 'axios';

class ListingPage extends Component {

  state = {
    //listing:null
  }

  render(){
    console.log(this.props.location,"LOCATION")
    return (
        <div className = "listing" onClick = {this.props.handleClose}>
            <Nav/>
            <ListingHeader listing = {this.props.location.state.listing}/>
            <ContentContainer>
              <div className = "listing__image-carousel">
                <span className = "listing__text">{`${this.props.match.params.id}`}</span>
              </div>

              THIS IS A LISTING {this.props.match.params.id ? `${this.props.match.params.id}` : null}
            </ContentContainer>
        </div>
    );
  }
}

export default ListingPage;
