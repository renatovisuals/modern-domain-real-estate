import React, { Component } from 'react';
import Button from '../Widgets/Button/Button';
import './ListingPanelFilter.scss';

class ListingPanelFilter extends Component {

  state = {
    test:'test'
  }

  handleFilterToggle = ()=>{
    const listingsFilter = document.getElementById('listing-filter')
    const hideListings = ()=>{
      this.props.toggleViewListings()
      listingsFilter.removeEventListener('transitionend',hideListings)
    }

    if(!this.props.filterDrawerIsOpen){
      this.props.toggleFilterDrawer(()=>{
        listingsFilter.addEventListener('transitionend',hideListings)
      })
    }else{
      this.props.toggleViewListings()
      this.props.toggleFilterDrawer()
    }

  }

  render(){

    return(
      <div id="listing-filter" className= {`listing-panel-filter ${this.props.filterDrawerIsOpen ? 'is-active' : null}`} >
        <Button onClick = {this.handleFilterToggle} content = "Filter" className = "listing-panel-filter__button--filter"> FILTER </Button>
      </div>
    )
  }
}

export default ListingPanelFilter;
