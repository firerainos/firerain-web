import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, {Tab} from 'material-ui/Tabs';
import Home from './Home'
import Download from './Download'
import Package from "./Package";
import SwipeableRoutes from "react-swipeable-routes";
import {Route, withRouter} from 'react-router-dom'
import AppFooter from "../AppFooter";
import {withStyles} from "material-ui/styles/index";
import PropTypes from "prop-types";

const styles = theme => ({
    Frame: {
        textAlign: 'center'
    },
    tags: {
        position: 'absolute',
        right: '30px'
    }
});

class Frame extends Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        value: 0,
    };

    router = ['/', '/download', '/package'];

    handleChange = (event, value) => {
        if (value === 3) {
            window.location.href = 'https://wiki.firerain.xyz';
        } else {
            this.setState({value});
            this.props.history.push(this.router[value])
        }
    };

    componentWillReceiveProps(props) {
        this.state.value = this.router.indexOf(props.location.pathname)
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.Frame}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            FireRain
                        </Typography>
                        <Tabs
                            className={classes.tags}
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
                </SwipeableRoutes>
                <AppFooter/>
            </div>
        );
    }
}

Frame.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Frame);