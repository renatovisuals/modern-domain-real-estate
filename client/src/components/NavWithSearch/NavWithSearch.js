import React, { Component } from 'react';
import './NavWithSearch.scss';
import { Link } from 'react-router-dom';
import MobileNav from '../MobileNav/MobileNav';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';
import ListingSearchBar from '../ListingSearchBar/ListingSearchBar';

class Nav extends Component {

state = {
  showMobileNav:false,
  results:[]
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

handleLocationClick = (id)=>{
  console.log(id,"this is the id!")
}

render(){

  return(
    <div>
      <MobileNav hideNav = {this.hideNav} showNav = {this.state.showMobileNav}/>
      {this.state.showMobileNav ? <ModalBackdrop click = {this.hideNav}/> : null}
      <nav id = "nav" className = "nav-with-search">
          <img className = "nav-with-search__hamburger" src = "/images/hamburger.svg" onClick = {this.openNav}/>
          <Link to={'/'}>
            <img className = "nav-with-search__logo" src ="/images/logo.svg"/>
          </Link>
          <ListingSearchBar
            handleChange = {(e)=> this.props.handleSearchInput(e)}
            searchQuery = {this.props.searchQuery}
            data ={this.props.results}
            handleLocationClick = {(locationId)=>this.props.handleLocationClick(locationId)}  
          />
          <ul className = "nav-with-search__menu--desktop">
            <li><Link to = {'/'}>Home</Link></li>
            <li><Link to = {'/about'}>About</Link></li>
            <li><Link to = {'#'}>Buy</Link></li>
            <li><Link to = {'#'}>Rent</Link></li>
            <li><Link to = {'/agents'}>Find An Agent</Link></li>
          </ul>
      </nav>
    </div>
  )
}

}

export default Nav;
