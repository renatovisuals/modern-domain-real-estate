import React, { Component } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import MobileNav from '../MobileNav/MobileNav';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop'

class Header extends Component {

  console = ()=>{
    console.log('this was clicked');
  }


render(){

  return(
    <div>
      <MobileNav onHideNav = {this.props.onHideNav} showNav = {this.props.showNav}/>
      {this.props.showNav ? <ModalBackdrop click = {this.props.onHideNav}/> : null}
      <nav className = "header">
        <div className = "header__container">
          <img className = "header__hamburger" src = "/images/hamburger.svg" onClick = {this.props.onOpenNav}/>
          <Link to={'/'}>
            <img className = "header__logo" src ="/images/logo.svg"/>
          </Link>
          <ul className = "header__menu--desktop">
            <li><Link to = {'/'}>Home</Link></li>
            <li><Link to = {'/about/1'}>About</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

}

export default Header;
