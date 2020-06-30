import React, { Component } from 'react';
import Button from '../Widgets/Button/Button';
import './ListingPanelFilter.scss';
import Select from '../Widgets/Select/Select';
import PriceSelect from '../Widgets/PriceSelect/PriceSelect';
import BedroomSelect from '../Widgets/BedroomSelect/BedroomSelect';
import BathroomSelect from '../Widgets/BathroomSelect/BathroomSelect';
import SqftSelect from '../Widgets/SqftSelect/SqftSelect';
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
            <div className = "listing-panel-filter__panel-title">
              Property Info
            </div>
            <div className = "listing-panel-filter__filter-container">
              <div className = "listing-panel-filter__input-container">
                <span className = "listing-panel-filter__input-title"> Square Feet </span>
                <SqftSelect label = "No Min" type= "min" defaultValue = {0} value ={this.props.filterState.sqftMin} name = "sqftMin" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
                <span className = "listing-panel-filter__hyphen-separator"> - </span>
                <SqftSelect label = "No Max" type="max" defaultValue = {750} value ={this.props.filterState.sqftMax} name = "sqftMax" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
              <div className = "listing-panel-filter__input-container">
                <span className = "listing-panel-filter__input-title"> Lot Size </span>
                <Select value ={this.props.filterState.bedrooms} name = "bedrooms" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
                <span className = "listing-panel-filter__hyphen-separator"> - </span>
                <Select style = {{marginRight:0}} value ={this.props.filterState.bathrooms} name = "bathrooms" className = "listing-panel-filter__select" onChange = {(e)=>this.props.handleChange(e)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListingPanelFilter;
