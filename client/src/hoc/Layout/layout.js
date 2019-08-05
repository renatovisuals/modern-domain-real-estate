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
  return(
    <div className = "app-container">
      <Header
        showNav = {this.state.showNav}
        onHideNav = {() => this.toggleSidenav(false)}
        onOpenNav = {() => this.toggleSidenav(true)}
      />
      {this.props.children}
      <Footer/>
    </div>
  )
}

}

export default Layout;
