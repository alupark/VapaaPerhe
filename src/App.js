import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Salary from './Salary';
import Income from './Income';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Salary />
        <Income />
      </div>
    );
  }
}

export default App;
