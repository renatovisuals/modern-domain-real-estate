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
    const maxPriceOptions = [{content:'No Max-Price',value:200000000},...priceOptions]
    const bedOptions = [
        {
          value:1,
          content:"1+ bed"
        },
        {
          value:2,
          content:"2+ bed"
        },
        {
          value:3,
          content:"3+ bed"
        },
        {
          value:4,
          content:"4+ bed"
        }
      ]
    const bathOptions = [
        {
          value:1,
          content:"1+ bath"
        },
        {
          value:2,
          content:"2+ bath"
        },
        {
          value:3,
          content:"3+ bath"
        },
        {
          value:4,
          content:"4+ bath"
        },
        {
          value:5,
          content:"5+ bath"
        }
      ]

    return(
      <div id="listing-filter" className= {`listing-panel-filter ${this.props.filterDrawerIsOpen ? 'is-active' : null}`} >
        <div className = "listing-panel-filter__filter-menu">
          <Select value ={this.props.filterState.minPrice} name = "minPrice" className = "listing-panel-filter__select listing-panel-filter__select--filter-menu" options = {minPriceOptions} onChange = {(e)=>this.props.handleChange(e)}/>
          <Select value ={this.props.filterState.maxPrice} name = "maxPrice" className = "listing-panel-filter__select listing-panel-filter__select--filter-menu" options = {maxPriceOptions} onChange = {(e)=>this.props.handleChange(e)}/>
          <Button onClick = {this.handleFilterToggle} content = {this.props.filterDrawerIsOpen ? 'Close Filters' : 'Filters'} className = "listing-panel-filter__button--filter"> </Button>
          <div className = "listing-panel-filter__filter-menu-bottom-border">
          </div>
        </div>
        <div className = {`listing-panel-filter__main ${this.props.filterDrawerIsOpen ? 'is-visible' : null}`}>
          <div className = "listing-panel-filter__panel">
            <div className = "listing-panel-filter__panel-title">
              Bedrooms and Bathrooms
            </div>
            <div className = "listing-panel-filter__filter-container">
              <Select value ={this.props.filterState.bedrooms} name = "bedrooms" className = "listing-panel-filter__select" options = {bedOptions} onChange = {(e)=>this.props.handleChange(e)}/>
              <Select value ={this.props.filterState.bathrooms} name = "bathrooms" className = "listing-panel-filter__select" options = {bathOptions} onChange = {(e)=>this.props.handleChange(e)}/>
            </div>
          </div>
          <div className = "listing-panel-filter__panel">
            <div className = "listing-panel-filter__panel-title">
              Property Type
            </div>
            <div className = "listing-panel-filter__filter-container">
              <input type="checkbox" name="singleFamily" value="Single Family" data-category = "propertyTypes" checked={this.props.filterState.singleFamily} onChange = {(e)=>this.props.handleChange(e)}/>
              <label for="male">Single Family</label><br/>
              <input type="checkbox" name="apartment" value="Apartment" data-category = "propertyTypes" checked ={this.props.filterState.apartment} onChange = {(e)=>this.props.handleChange(e)}/>
              <label for="male">Apartment</label><br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListingPanelFilter;
