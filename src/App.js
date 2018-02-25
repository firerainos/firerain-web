import React, {Component} from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, {Tab} from 'material-ui/Tabs';
import Home from './Home'
import Download from './Download'
import SwipeableRoutes from "react-swipeable-routes";
import { Route ,withRouter } from 'react-router-dom'
import Package from "./Package";

class App extends Component {
    state = {
        value: 0,
    };

    router = ['/', '/download','/package'];

    handleChange = (event, value) => {
        this.setState({value});
        this.props.history.push(this.router[value])
    };

    componentWillReceiveProps(props) {
        this.state.value = this.router.indexOf(props.location.pathname)
    }

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
                                <Tab label="首页"/>
                                <Tab label="下载"/>
                                <Tab label="Packages"/>
                                <Tab label="Wiki"/>
                            </Tabs>
                        </Toolbar>

                    </AppBar>
                    <SwipeableRoutes>
                            <Route exact path="/" component={Home}/>
                            <Route path="/download" component={Download}/>
                            <Route path="/package" component={Package}/>
                            {/*<Redirect to="/"/>*/}
                    </SwipeableRoutes>
                </div>
        );
    }
}

export default withRouter(App);
