import React from 'react';
import { Link } from 'react-router-dom';
import './mobile-nav.scss';

 const MobileNav = (props)=>{
  let style;

  if(props.showNav){
    style = {
      'marginLeft':'0px'
    }
  }else{
    style = {
      'marginLeft':'-500px',
      'boxShadow':'none'
    }
  }

  return(
    <div className = "mobile-nav" style = {style}>
      <img className = "mobile-nav__x" src = "/images/mobile-x.svg" onClick = {props.hideNav}/>
      <ul className = "mobile-nav__menu">
        <li><Link to = {'/'}>Home</Link></li>
        <li><Link to = {'/about/1'}>About</Link></li>
      </ul>
    </div>
  )
}

export default MobileNav;
