import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import About from './components/About/about';
import AgentLandingPage from './components/AgentLandingPage/AgentLandingPage';

class Routes extends Component {
  render(){
    return(
      <Layout>
        <Switch>
            <Route exact path="/" exact component ={Home} />
            <Route exact path="/about/:id" exact component ={About} />
            <Route exact path="/agents/:agentName/:id" exact component ={AgentLandingPage} />
        </Switch>
      </Layout>
    )
  }
}

export default Routes;
