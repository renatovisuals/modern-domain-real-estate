import React, { Component } from 'react';
import Button from '../Widgets/Button/Button';
import './ListingPanelFilter.scss';
import Select from '../Widgets/Select/Select';
import PriceSelect from '../Widgets/PriceSelect/PriceSelect';
import BedroomSelect from '../Widgets/BedroomSelect/BedroomSelect';
import BathroomSelect from '../Widgets/BathroomSelect/BathroomSelect';
import SqftSelect from '../Widgets/SqftSelect/SqftSelect';
import LotSizeSelect from '../Widgets/LotSizeSelect/LotSizeSelect';
import YearSelect from '../Widgets/YearSelect/YearSelect';
import Checkbox from '../Widgets/Checkbox/Checkbox';
import HOASelect from '../Widgets/HOASelect/HOASelect';

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
      if(this.props.filterDrawerIsOpen){
        listingsFilter.classList.add('enable-scroll')
        console.log(listingsFilter,"enabling scroll")
      }
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

  resetFilter = ()=>{
    const defaultFilterState = {
      bedrooms:'',
      bathrooms:'',
      minPrice:'',
      maxPrice:'',
      minSqft:'',
      maxSqft:'',
      minLotSize:'',
      maxLotSize:'',
      maxHOAFee:'',
      propertyTypes:[],
      home:false,
      manufactured:false,
      condosCoops:false,
      multiFamily:false,
      lotsLand:false,
      apartment:false,
      washerDryer:false,
      airConditioning:false,
      garage:false,
      pool:false,
      elevator:false,
      minYear:false,
      maxYear:false
    }
    this.props.resetFilter(defaultFilterState)
  }

  updateWindowWidth = ()=>{
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
    //const listingFilter = document.getElementById('listing-filter');
    //const listingFilterMenu = document.getElementById('listing-filter-menu');
    //listingFilter.addEventListener('scroll',()=>{
    //  listingFilterMenu.style.top = `${listingFilter.scrollTop}px`;
    //})
    this.renderAnimationDelay()
  }
  componentWillUnmount(){
    window.removeEventListener('resize',()=> this.updateWindowWidth())
  }

  render(){
      const renderFilterButton = ()=>{
        if(window.innerWidth > 570 && window.innerWidth <768){
          return(
            <Button onClick = {this.handleFilterToggle} content = {this.props.filterDrawerIsOpen ? 'Close Filters' : 'More Filters'} className = "listing-panel-filter__button listing-panel-filter__button--filter"> </Button>
          )
        }else if(window.innerWidth > 1000){
          return(
            <Button onClick = {this.handleFilterToggle} content = {this.props.filterDrawerIsOpen ? 'Close Filters' : 'More Filters'} className = "listing-panel-filter__button listing-panel-filter__button--filter"> </Button>
          )
        }else{
          return(
            <Button onClick = {this.handleFilterToggle} content = {this.props.filterDrawerIsOpen ? 'Close Filters' : 'Filters'} className = "listing-panel-filter__button listing-panel-filter__button--filter"> </Button>
          )
        }
      }

    return(
      <div id="listing-filter" className= {`listing-panel-filter ${this.props.filterDrawerIsOpen ? 'is-active' : ""}`} >
        <div id="listing-filter-menu" className = "listing-panel-filter__filter-menu">
          <PriceSelect type = "min" label = "No Min-Price" value ={this.props.filterState.minPrice} name = "minPrice" className = "listing-panel-filter__select listing-panel-filter__select--filter-menu" onChange = {(e)=>this.props.handleChange(e)}/>
          <span className = "listing-panel-filter__hyphen-separator listing-panel-filter__hyphen-separator--filter-menu"> - </span>
          <PriceSelect type = "max" label = "No Max-Price" value ={this.props.filterState.maxPrice} name = "maxPrice" className = "listing-panel-filter__select listing-panel-filter__select--filter-menu" onChange = {(e)=>this.props.handleChange(e)}/>
          {renderFilterButton()}
          <div className = "listing-panel-filter__filter-menu-bottom-border">
          </div>
        </div>
        <div id = "main" style = {{minHeight:this.props.mapHeight-66}} className = {`listing-panel-filter__main ${this.props.filterDrawerIsOpen ? 'is-visible' : ""}`}>
          <div className = "listing-panel-filter__panel listing-panel-filter__panel--price">
            <div className = "listing-panel-filter__panel-title">
              Price
            </div>
            <div className = "listing-panel-filter__filter-container">
              <PriceSelect label = "No Min" type = "min" value ={this.props.filterState.minPrice} name = "minPrice" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
              <span className = "listing-panel-filter__hyphen-separator"> - </span>
              <PriceSelect label = "No Max" type = "min" value ={this.props.filterState.maxPrice} name = "maxPrice" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
            </div>
          </div>
          <div className = "listing-panel-filter__panel">
            <div className = "listing-panel-filter__panel-title">
              Bedrooms and Bathrooms
            </div>
            <div className = "listing-panel-filter__filter-container">
              <BedroomSelect value ={this.props.filterState.bedrooms} name = "bedrooms" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
              <span className = "listing-panel-filter__hyphen-separator"> - </span>
              <BathroomSelect value ={this.props.filterState.bathrooms} name = "bathrooms" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
            </div>
          </div>
          <div className = "listing-panel-filter__panel">
            <div className = "listing-panel-filter__panel-title">
              Property Type
            </div>
            <div className = "listing-panel-filter__filter-container">
              <div className = "listing-panel-filter__input-container">
                <Checkbox id="home" labelName = "Home" name="home" value="Home" category = "propertyTypes" checked={this.props.filterState.home} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="manufactured" labelName = "Manufactured" name="manufactured" value="Manufactured" category = "propertyTypes" checked={this.props.filterState.manufactured} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="condos-coops" labelName = "Condos/co-ops" type="checkbox" name="condosCoops" value="Condos/co-ops" category = "propertyTypes" checked={this.props.filterState.condosCoops} onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
              <div className = "listing-panel-filter__input-container">
                <Checkbox id="multi-family" labelName = "Multi-Family" name="multiFamily" value="Multi-Family" category = "propertyTypes" checked={this.props.filterState.multiFamily} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="apartment" labelName = "Apartment" name="apartment" value="Apartment" category = "propertyTypes" checked={this.props.filterState.apartment} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="lots-land" labelName = "Lots/Land" type="checkbox" name="lotsLand" value="Condos/coops" category = "propertyTypes" checked={this.props.filterState.lotsLand} onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
            </div>
          </div>
          <div className = "listing-panel-filter__panel">
            <div className = "listing-panel-filter__panel-title listing-panel-filter__panel-title--no-margin">
              Property Info
            </div>
            <div className = "listing-panel-filter__filter-container">
              <div className = "listing-panel-filter__input-container">
                <span className = "listing-panel-filter__input-title"> Square Feet </span>
                <SqftSelect label = "No Min" type = "min" defaultValue = {0} value ={this.props.filterState.minSqft} name = "minSqft" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
                <span className = "listing-panel-filter__hyphen-separator"> - </span>
                <SqftSelect label = "No Max" type ="max" defaultValue = {750} value ={this.props.filterState.maxSqft} name = "maxSqft" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
              <div className = "listing-panel-filter__input-container">
                <span className = "listing-panel-filter__input-title"> Lot Size </span>
                <LotSizeSelect label = "No Min" type = "min" value ={this.props.filterState.minLotSize} name = "minLotSize" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
                <span className = "listing-panel-filter__hyphen-separator"> - </span>
                <LotSizeSelect label = "No Max" type = "max" value ={this.props.filterState.maxLotSize} name = "maxLotSize" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
            </div>
            <div className = "listing-panel-filter__filter-container">
              <div className = "listing-panel-filter__input-container">
                <span className = "listing-panel-filter__input-title"> Year Built </span>
                <YearSelect label = "No Min" value ={this.props.filterState.minYear} name = "minYear" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
                <span className = "listing-panel-filter__hyphen-separator"> - </span>
                <YearSelect label = "No Max" value ={this.props.filterState.maxYear} name = "maxYear" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
              <div className = "listing-panel-filter__input-container">
                <span className = "listing-panel-filter__input-title"> Max HOA Fee </span>
                <HOASelect label = "No Max" value ={this.props.filterState.maxHOAFee} name = "maxHOAFee" className = "listing-panel-filter__select listing-panel-filter__select--full-width" onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
            </div>
          </div>
          <div className = "listing-panel-filter__panel">
            <div className = "listing-panel-filter__panel-title">
              Other Amentities
            </div>
            <div className = "listing-panel-filter__filter-container">
              <div className = "listing-panel-filter__input-container">
                <Checkbox id="washer-dryer" labelName = "Must Have Washer / Dryer" name="washerDryer" value="Washer/Dryer" category = "amentities" checked={this.props.filterState.washerDryer} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="air-conditioning" labelName = "Must Have Air Conditoning" name="airConditioning" value="Air Conditioning" category = "amentities" checked={this.props.filterState.airConditioning} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="garage" labelName = "Must Have Garage" type="checkbox" name="garage" value="Garage" category = "amentities" checked={this.props.filterState.garage} onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
              <div className = "listing-panel-filter__input-container">
                <Checkbox id="pool" labelName = "Must Have Pool" name="pool" value="Pool" category = "amentities" checked={this.props.filterState.pool} onChange = {(e)=>this.props.handleChange(e)}/>
                <Checkbox id="elevator" labelName = "Must Have Elevator" name="elevator" value="Elevator" category = "amentities" checked={this.props.filterState.elevator} onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
            </div>
          </div>
        </div>
        {this.props.filterDrawerIsOpen ?
          <div className = "listing-panel-filter__bottom-menu">
            <Button className = "listing-panel-filter__button listing-panel-filter__button--reset" content = "Reset Filter" onClick = {(e)=>this.resetFilter(e)}/>
          </div>
          :
         null}
      </div>
    )
  }
}

export default ListingPanelFilter;
