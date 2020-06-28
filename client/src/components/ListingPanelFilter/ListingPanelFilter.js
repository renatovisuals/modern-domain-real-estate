import React, { Component } from 'react';
import Button from '../Widgets/Button/Button';
import './ListingPanelFilter.scss';
//import Select from '../Widgets/Select/Select';
import Dropdown from '../Widgets/Dropdown/Dropdown';


import Checkbox from '../Widgets/Checkbox/Checkbox';

class ListingPanelFilter extends Component {

  state = {
    windowWidth:window.innerWidth,
    filterDrawerIsTransitioning:false
  }

  handleFilterToggle = ()=>{

    const listingsFilter = document.getElementById('listing-filter');
    const listingPanel = document.getElementById('listing-panel');
    this.props.setFilterDrawerTransitionState(false)
    console.log(listingPanel, "listing-panel")
    const hideListings = ()=>{
      setTimeout(()=>{
        listingsFilter.classList.add('enable-scroll')
      },200)
      this.props.toggleViewListings()
      listingsFilter.removeEventListener('transitionend',hideListings)
    }
    if(!this.props.filterDrawerIsOpen){
      this.props.setFilterDrawerTransitionState(true)
      this.props.toggleFilterDrawer(()=>{
        listingsFilter.addEventListener('transitionend',hideListings)
      })
    }else{
      this.props.toggleViewListings()
      this.props.toggleFilterDrawer()
    }
  }

  updateWindowWidth = ()=>{
    console.log(window.innerWidth,"inner width")
    this.setState({
      windowWidth:window.innerWidth
    })
  }

  renderAnimationDelay = ()=>{
    const panels = document.querySelectorAll(".listing-panel-filter__panel");
    let delay = .1;
    for(let i = 0; i<panels.length; i++){
      console.log(panels[i],"panel")
      panels[i].style.transitionDelay =`${delay}s`
      delay = delay + .1;
    }
  }

  componentDidMount(){
    window.addEventListener('resize',()=> this.updateWindowWidth())
    this.renderAnimationDelay()
  }
  componentWillUnmount(){
    window.removeEventListener('resize',()=> this.updateWindowWidth())
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
      const renderFilterButton = ()=>{
        if(window.innerWidth > 570 && window.innerWidth <768){
          return(
            <Button onClick = {this.handleFilterToggle} content = {this.props.filterDrawerIsOpen ? 'Close Filters' : 'More Filters'} className = "listing-panel-filter__button--filter"> </Button>
          )
        }else if(window.innerWidth > 1000){
          return(
            <Button onClick = {this.handleFilterToggle} content = {this.props.filterDrawerIsOpen ? 'Close Filters' : 'More Filters'} className = "listing-panel-filter__button--filter"> </Button>
          )
        }else{
          return(
            <Button onClick = {this.handleFilterToggle} content = {this.props.filterDrawerIsOpen ? 'Close Filters' : 'Filters'} className = "listing-panel-filter__button--filter"> </Button>
          )
        }

      }

    return(
      <div id="listing-filter" className= {`listing-panel-filter ${this.props.filterDrawerIsOpen ? 'is-active' : ""}`} >
        <div className = "listing-panel-filter__filter-menu">
          <Dropdown value ={this.props.filterState.minPrice} name = "minPrice" className = "listing-panel-filter__select listing-panel-filter__select--filter-menu" options = {minPriceOptions} onChange = {(e)=>this.props.handleChange(e)}/>
          <Dropdown value ={this.props.filterState.maxPrice} name = "maxPrice" className = "listing-panel-filter__select listing-panel-filter__select--filter-menu" options = {maxPriceOptions} onChange = {(e)=>this.props.handleChange(e)}/>
          {renderFilterButton()}
          <div className = "listing-panel-filter__filter-menu-bottom-border">
          </div>
        </div>
        <div id = "main" style = {{height:this.props.mapHeight-66}} className = {`listing-panel-filter__main ${this.props.filterDrawerIsOpen ? 'is-visible' : ""} disable-scroll`}>
          <div className = "listing-panel-filter__panel listing-panel-filter__panel--price">
            <div className = "listing-panel-filter__panel-title">
              Price
            </div>
            <div className = "listing-panel-filter__filter-container">
              <Dropdown value ={this.props.filterState.minPrice} name = "minPrice" className = "listing-panel-filter__select" options = {minPriceOptions} onChange = {(e)=>this.props.handleChange(e)}/>
              <Dropdown value ={this.props.filterState.maxPrice} name = "maxPrice" className = "listing-panel-filter__select" options = {maxPriceOptions} onChange = {(e)=>this.props.handleChange(e)}/>
            </div>
          </div>
          <div className = "listing-panel-filter__panel">
            <div className = "listing-panel-filter__panel-title">
              Bedrooms and Bathrooms
            </div>
            <div className = "listing-panel-filter__filter-container">
              <Dropdown value ={this.props.filterState.bedrooms} name = "bedrooms" className = "listing-panel-filter__select" options = {bedOptions} onChange = {(e)=>this.props.handleChange(e)}/>
              <Dropdown value ={this.props.filterState.bathrooms} name = "bathrooms" className = "listing-panel-filter__select" options = {bathOptions} onChange = {(e)=>this.props.handleChange(e)}/>
            </div>
          </div>
          <div className = "listing-panel-filter__panel">
            <div className = "listing-panel-filter__panel-title">
              Property Type
            </div>
            <div className = "listing-panel-filter__filter-container">
              <div className = "listing-panel-filter__checkbox-container">
                <Checkbox id="home" labelName = "Home" name="home" value="Home" category = "propertyTypes" checked={this.props.filterState.home} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="manufactured" labelName = "Manufactured" name="manufactured" value="Manufactured" category = "propertyTypes" checked={this.props.filterState.manufactured} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="condos-coops" labelName = "Condos/co-ops" type="checkbox" name="condosCoops" value="Condos/co-ops" category = "propertyTypes" checked={this.props.filterState.condosCoops} onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
              <div className = "listing-panel-filter__checkbox-container">
                <Checkbox id="multi-family" labelName = "Multi-Family" name="multiFamily" value="Multi-Family" category = "propertyTypes" checked={this.props.filterState.multiFamily} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="apartments" labelName = "Apartments" name="apartments" value="Apartments" category = "propertyTypes" checked={this.props.filterState.apartments} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="lots-land" labelName = "Lots/Land" type="checkbox" name="lotsLand" value="Condos/coops" category = "propertyTypes" checked={this.props.filterState.lotsLand} onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
            </div>
          </div>
          <div className = "listing-panel-filter__panel">
            <div className = "listing-panel-filter__panel-title">
              Property Info
            </div>
            <div className = "listing-panel-filter__filter-container">
              <Dropdown value ={this.props.filterState.bedrooms} name = "bedrooms" className = "listing-panel-filter__select" options = {bedOptions} onChange = {(e)=>this.props.handleChange(e)}/>
              <Dropdown value ={this.props.filterState.bathrooms} name = "bathrooms" className = "listing-panel-filter__select" options = {bathOptions} onChange = {(e)=>this.props.handleChange(e)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListingPanelFilter;
