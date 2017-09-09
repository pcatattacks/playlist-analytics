import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Navbar from './components/Navbar';
import Controller from './components/Controller';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Navbar />
          <Controller />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
