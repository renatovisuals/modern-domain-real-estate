import React, { Component } from 'react';
import './ListingPageNav.scss';
import { Link } from 'react-router-dom';
import MobileNav from '../MobileNav/MobileNav';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import ListingSearchBar from '../ListingSearchBar/ListingSearchBar';

class ListingPageNav extends Component {

state = {
  showMobileNav:false,
  results:[],
  isMobileWidth:false,
  mobileWidth:650
}

hideNav = ()=>{
  this.setState({
    showMobileNav:false
  })
}

openNav = ()=>{
  this.setState({
    showMobileNav:true
  })
}

isMobileWidth = ()=>{
  this.setState({
    isMobileWidth:window.innerWidth<this.state.mobileWidth
  })
}

componentDidMount(){
  this.isMobileWidth()
  window.addEventListener("resize",()=>this.isMobileWidth());
}

componentWillUnmount(){
  window.removeEventListener("resize",()=>this.isMobileWidth());
}

render(){
  const placeHolder = this.state.isMobileWidth ? "City, Address, Agent" : "City, Neighborhood, Address, ZIP, Agent"
  const renderLogo = ()=>{
    if(!this.state.isMobileWidth){
      return(
        <Link to={'/'}>
          <img className = "listing-page-nav__logo" src ="/images/logo.svg"/>
        </Link>
      )
    }
  }

  const renderMobileSearch = ()=>{
    if(this.state.isMobileWidth){
      return(
        <ListingSearchBar className = "listing-page-nav__mobile-search"
          handleChange = {(e)=> this.props.handleSearchInput(e)}
          searchQuery = {this.props.searchQuery}
          data ={this.props.results}
          handleResultClick = {(result)=>this.props.handleResultClick(result)}
          handleSearchSubmit = {this.props.handleSearchSubmit}
          clearSearch = {this.props.clearSearch}
          placeHolder = {placeHolder}
          mobileWidth = {this.state.mobileWidth}
          resultsVisible = {this.props.resultsVisible}
          hideListingSearchResults = {this.props.hideListingSearchResults}
        />
      )
    }
  }

  const renderDesktopSearch = ()=>{
    if(!this.state.isMobileWidth){
      return(
        <ListingSearchBar className = "listing-page-nav__desktop-search"
          handleChange = {(e)=> this.props.handleSearchInput(e)}
          searchQuery = {this.props.searchQuery}
          data ={this.props.results}
          handleResultClick = {(result)=>this.props.handleResultClick(result)}
          handleSearchSubmit = {this.props.handleSearchSubmit}
          clearSearch = {this.props.clearSearch}
          placeHolder = {placeHolder}
          mobileWidth = {this.state.mobileWidth}
          resultsVisible = {this.props.resultsVisible}
          hideListingSearchResults = {this.props.hideListingSearchResults}
        />
      )
    }
  }

  return(
    <div>
      <MobileNav hideNav = {this.hideNav} showNav = {this.state.showMobileNav}/>
      {this.state.showMobileNav ? <ModalBackdrop click = {this.hideNav}/> : null}
      <nav id = "nav" className = "listing-page-nav" style = {{padding:'0',margin:'0'}}>
        <div className ="listing-page-nav__main" style = {{display:'flex',width:'100%', margin:'0',padding:'0'}}>
          <img className = "listing-page-nav__hamburger" src = "/images/hamburger.svg" onClick = {this.openNav}/>
          {renderLogo()}
          {renderMobileSearch()}
          <ul className = "listing-page-nav__menu--desktop">
            <li><Link to = {'/'}>Home</Link></li>
            <li><Link to = {'/about'}>About</Link></li>
            <li><Link to = {'#'}>Buy</Link></li>
            <li><Link to = {'#'}>Rent</Link></li>
            <li><Link to = {'/agents'}>Find An Agent</Link></li>
          </ul>
        </div>
        {!this.state.isMobileWidth ?
          <div className = "test">
            {renderDesktopSearch()}
          </div>
        :
        null
        }
      </nav>
    </div>
  )
}

}

export default ListingPageNav;
