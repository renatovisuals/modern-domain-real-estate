import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
//import history from './history';
import { createBrowserHistory } from "history";
import './index.scss';
const history = createBrowserHistory()
const App = () => {
  return(
    <BrowserRouter history = {history}>
      <Routes/>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
