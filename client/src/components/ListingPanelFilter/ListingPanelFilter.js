import React, { Component } from 'react';
import Button from '../Widgets/Button/Button';
import './ListingPanelFilter.scss';
import Select from '../Widgets/Select/Select';

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

  handleChange = (name,value)=>{
    this.props.handleChange(name,value)
  }

  render(){
    const priceOptions = [
      {
        content:"100,000",
        value:100000
      },
      {
        content:"125,000",
        value:125000
      },
      {
        content:"150,000",
        value:150000
      },
      {
        content:"15,000,000",
        value:15000000
      },
      {
        content:"500,000",
        value:500000
      }
    ]
    const minPriceOptions = [{content:'No Min-Price',value:0},...priceOptions]
    const maxPriceOptions = [{content:'No Max-Price',value:0},...priceOptions]


    return(
      <div id="listing-filter" className= {`listing-panel-filter ${this.props.filterDrawerIsOpen ? 'is-active' : null}`} >
        <div className = "listing-panel-filter__filter-menu">
          <Select value ={this.props.filterState.minPrice} name = "minPrice" className = "listing-panel-filter__select" options = {minPriceOptions} onChange = {(name,value)=>this.handleChange(name,value)}/>
          <Select value ={this.props.filterState.maxPrice} name = "maxPrice" className = "listing-panel-filter__select" options = {maxPriceOptions} onChange = {(name,value)=>this.handleChange(name,value)}/>
          <Button onClick = {this.handleFilterToggle} content = {this.props.filterDrawerIsOpen ? 'Close Filter' : 'Filter'} className = "listing-panel-filter__button--filter"> FILTER </Button>
          <div className = "listing-panel-filter__filter-menu-bottom-border">
          </div>
        </div>
        <div className = "listing-panel-filter__main">
          <div className = "listing-panel-filter__test">
          </div>
        </div>
      </div>
    )
  }
}

export default ListingPanelFilter;
