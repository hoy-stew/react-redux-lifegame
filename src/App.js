import React, { Component } from 'react';
import './App.css';
// import Lifegame from './components/Lifegame';
import Lifegame from './containers/Lifegame'; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Lifegame />
      </div>
    );
  }
}

export default App;
