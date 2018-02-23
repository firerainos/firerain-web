import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import Home from './Home'
import Download from './Download'
import SwipeableViews from "react-swipeable-views";


class App extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
    return (
      <div className="App">
          <AppBar position="static">
              <Toolbar>
                  <Typography variant="title" color="inherit">
                      FireRain
                  </Typography>
                  <Tabs
                      className="tags"
                      value={this.state.value}
                      onChange={this.handleChange}
                      fullWidth
                  >
                      <Tab label="首页" />
                      <Tab label="下载" />
                      <Tab label="Packages" />
                      <Tab label="Wiki" />
                  </Tabs>
              </Toolbar>

          </AppBar>
          <SwipeableViews
              // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
          >
            {this.state.value === 0 && <Home/>}
            {this.state.value === 1 && <Download/>}
          </SwipeableViews>
      </div>
    );
  }
}

export default App;
