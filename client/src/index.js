import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Login from './Login/login.jsx';
import Signup from './SignUp/signup.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation/navigation.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'Home',
    }
  }
  render() {
      return(
        <div>
          <Router>
            <Route exact path = "/" component = {Navigation} />
            <Route path = "/login" component={Login} />
            <Route path = "/signup" component={Signup} />
            <Route path = "/dashboard" component={Dashboard} />
          </Router>
        </div>
      )
  }
};

ReactDOM.render(<Home />, document.getElementById('app'));
