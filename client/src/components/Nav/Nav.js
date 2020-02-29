import React, { Component } from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';
import MobileNav from '../MobileNav/MobileNav';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';

class Nav extends Component {

state = {
  showMobileNav:false
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

render(){

  return(
    <div>
      <MobileNav hideNav = {this.hideNav} showNav = {this.state.showMobileNav}/>
      {this.state.showMobileNav ? <ModalBackdrop click = {this.hideNav}/> : null}
      <nav id = "nav" className = "header">
          <img className = "header__hamburger" src = "/images/hamburger.svg" onClick = {this.openNav}/>
          <Link to={'/'}>
            <img className = "header__logo" src ="/images/logo.svg"/>
          </Link>
          <ul className = "header__menu--desktop">
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
