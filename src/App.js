import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Salary from './Salary';
import Income from './Income';
import TargetSelector from './TargetSelector';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Vapaa perhe</h1>
        <div>
          <h2>Minä</h2>
          <Salary target="me" />
        </div>
        <div>
          <h2>Hän</h2>
          <Salary target="they" />
        </div>
        <div>
          <h2>Tulot</h2>
          <TargetSelector />
          <Income />
        </div>
      </div>
    );
  }
}

export default App;
