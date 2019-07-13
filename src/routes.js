import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import About from './components/About/about';
import AgentLandingPage from './components/AgentLandingPage/AgentLandingPage';
import MainAgentPage from './components/MainAgentPage/MainAgentPage';
import ExpertisePage from './components/ExpertisePage/ExpertisePage';
import ServicesPage from './components/ServicesPage/ServicesPage';
import InspectionsPage from './components/InspectionsPage/InspectionsPage';

class Routes extends Component {
  render(){
    return(
      <Layout>
        <Switch>
            <Route exact path="/" exact component ={Home} />
            <Route exact path="/about" exact component ={About} />
            <Route exact path="/agents/:agentName/:id" exact component ={AgentLandingPage} />
            <Route exact path="/agents" exact component ={MainAgentPage} />
            <Route exact path="/about/expertise" exact component ={ExpertisePage} />
            <Route exact path="/about/services" exact component ={ServicesPage} />
            <Route exact path="/about/inspections" exact component ={InspectionsPage} />
        </Switch>
      </Layout>
    )
  }
}

export default Routes;
