/*
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/Footer';
import './layout.css';

class Layout extends Component {
  state ={
    showNav:false
  }

  toggleSidenav = (action) => {
    this.setState({
      showNav:action
    })
  }

render(){
  const {location} = this.props;
  const hiddenFooterPathnames = ["/listings"]
  const showFooter = ()=>{
    let pathname = location.pathname.substring(1)
    pathname = pathname.split("?")[0];
    pathname = pathname.split("/")[0];
    pathname = "/" + pathname;
    return hiddenFooterPathnames.includes(pathname);
  }

  return(
    <div className = "app-container">
      <Header
        showNav = {this.state.showNav}
        onHideNav = {() => this.toggleSidenav(false)}
        onOpenNav = {() => this.toggleSidenav(true)}
      />
      {this.props.children}
      {!showFooter() && <Footer/>}
    </div>
  )
}

}

export default Layout;
*/
