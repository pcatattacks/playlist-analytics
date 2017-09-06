import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './components/Navbar';
import Inputbar from './components/Inputbar';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Navbar />
          <Inputbar />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
