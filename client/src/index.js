import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Login from './Login/login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.component {
  render() {
      return(
          <div>
            Hello World
          </div>
      )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
