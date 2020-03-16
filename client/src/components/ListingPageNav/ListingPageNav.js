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
  isMobileWidth:false
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
    isMobileWidth:window.innerWidth<650
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
        <ListingSearchBar
          handleChange = {(e)=> this.props.handleSearchInput(e)}
          searchQuery = {this.props.searchQuery}
          data ={this.props.results}
          handleResultClick = {(result)=>this.props.handleResultClick(result)}
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
        <div className = "test">
          <ListingSearchBar className = "listing-page-nav__search-bar"
            handleChange = {(e)=> this.props.handleSearchInput(e)}
            searchQuery = {this.props.searchQuery}
            data ={this.props.results}
            handleResultClick = {(result)=>this.props.handleResultClick(result)}
          />
        </div>
      </nav>
    </div>
  )
}

}

export default ListingPageNav;
