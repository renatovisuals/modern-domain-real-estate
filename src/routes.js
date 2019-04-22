import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import About from './components/About/about';

class Routes extends Component {
  render(){
    return(
      <Layout>
        <Switch>
            <Route path="/" exact component ={Home} />
            <Route path="/about/:id" exact component ={About} />
        </Switch>
      </Layout>
    )
  }
}

export default Routes;
