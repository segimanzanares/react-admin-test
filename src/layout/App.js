import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

class App extends Component {

  render() {
    return (
      <>
        <Header />
        <Sidebar />
      </>
    );
  }
};

export default App;