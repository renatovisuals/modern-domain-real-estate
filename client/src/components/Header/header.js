import React, { Component } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import MobileNav from '../MobileNav/MobileNav';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import ContentContainer from '../../hoc/ContentContainer/ContentContainer';

class Header extends Component {

render(){

  return(
    <div>
      <MobileNav onHideNav = {this.props.onHideNav} showNav = {this.props.showNav}/>
      {this.props.showNav ? <ModalBackdrop click = {this.props.onHideNav}/> : null}
      <nav className = "header">
          <img className = "header__hamburger" src = "/images/hamburger.svg" onClick = {this.props.onOpenNav}/>
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

export default Header;
