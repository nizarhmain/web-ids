import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NormalLoginForm from './components/LoginForm';
import AdminGestore from './components/AdminGestore';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Gestore from './components/Gestore';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={NormalLoginForm}/>
          <Route exact path="/dashboard" component={Gestore}/>
          <Route exact path="/admin" component={AdminGestore}/>
        </div>
    </Router>
    );
  }
}

export default App;
