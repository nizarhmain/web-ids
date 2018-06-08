import React, { Component } from 'react';
import './App.css';

import NormalLoginForm from './components/LoginForm';
import AdminGestore from './components/AdminGestore';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Gestore from './components/Gestore';

import withCRUD from './components/withCRUD'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={NormalLoginForm}/>
          <Route exact path="/dashboard" component={withCRUD(Gestore)}/>
          <Route exact path="/admin" component={withCRUD(AdminGestore)}/>
        </div>
    </Router>
    );
  }
}

export default App;
