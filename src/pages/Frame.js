import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, {Tab} from 'material-ui/Tabs';
import Home from './Home'
import Download from './Download'
import Profile from './profile';
import Package from "./Package";
import SwipeableRoutes from "react-swipeable-routes";
import {Route} from 'react-router-dom'
import AppFooter from "../AppFooter";
import {withStyles} from "material-ui/styles/index";
import PropTypes from "prop-types";
import AccountFrame from "../widgets/AccountFrame";
import Cookies from 'js-cookie';
import axios from 'axios'

const styles = theme => ({
    Frame: {
        textAlign: 'center',
        flexGrow: 1,
    },
    content: {
        minHeight: 'calc(100vh - 260px)'
    },
    flex: {
        textAlign: 'left',
        flex: 1,
    },
    tags: {
        marginRight: '30px'
    }
});

class Frame extends Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        value: 0,
        user: Cookies.getJSON('user')
    };

    router = ['/', '/download', '/package'];

    handleChange = (event, value) => {
        if (value === 3) {
            window.location.href = 'https://wiki.archlinux.org';
        } else {
            this.setState({value});
            this.props.history.push(this.router[value])
        }
    };

    handleLogup = () => {
        axios.post('/api/logout')
            .then(r => {
                if (r.data.code === 0) {
                    Cookies.remove("user");
                    this.setState({user: undefined})
                } else {
                    alert("退出失败")
                }
            });
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
                        <Typography variant="title" color="inherit" className={classes.flex}>
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
                            <Tab label="Arch Wiki"/>
                        </Tabs>
                        {this.state.user !== undefined && <AccountFrame onLogup={this.handleLogup}/>}
                    </Toolbar>

                </AppBar>
                <SwipeableRoutes className={classes.content}>
                    <Route exact path="/" component={Home}/>
                    <Route path="/download" component={Download}/>
                    <Route path="/package" component={Package}/>
                    <Route path="/profile" component={Profile}/>
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