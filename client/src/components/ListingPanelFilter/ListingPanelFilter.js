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
        <div className = "listing-panel-filter__filter-menu">
          <Button onClick = {this.handleFilterToggle} content = {this.props.filterDrawerIsOpen ? 'Close Filter' : 'Filter'} className = "listing-panel-filter__button--filter"> FILTER </Button>
          <div className = "listing-panel-filter__filter-menu-bottom-border">
          </div>
        </div>
        <div className = "listing-filter__main">
          <div className = "listing-panel-filter__test">
          </div>
        </div>
      </div>
    )
  }
}

export default ListingPanelFilter;
