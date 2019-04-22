import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/header';
import './layout.css';

class Layout extends Component {
  state ={
    showNav:true
  }

  toggleSidenav = (action) => {
    this.setState({
      showNav:action
    })
  }

render(){
  return(
    <div>
      <Header
        showNav = {this.state.showNav}
        onHideNav = {() => this.toggleSidenav(false)}
        onOpenNav = {() => this.toggleSidenav(true)}
      />
      {this.props.children}
    </div>
  )
}

}

export default Layout;
