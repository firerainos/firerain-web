import React, {Component} from 'react';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import axios from 'axios'
import User from "./pages/User";
import Group from "./pages/Group";
import {
    AppBar,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText, MenuItem,
    MenuList, Paper,
    Tab,
    Tabs,
    Toolbar
} from "material-ui";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import ListPage from "./pages/List"
import {ExpandLess, ExpandMore} from "material-ui-icons";
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    appBar: {
        width: `calc(100% - 200px)`,
        marginLeft: 200
    },
    toolbar: theme.mixins.toolbar,
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    drawerPaper: {
        position: 'relative',
        width: 200,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    root: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    }
});

class Admin extends Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        open: true
    };

    handleClick(id) {
        let tmp = ['/admin/list', '/admin/uCenter/user', '/admin/uCenter/group']
        this.props.history.push(tmp[id])
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            FireRain
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar}>
                    </div>
                    <Divider/>
                    <MenuList>
                        <MenuItem selected={this.props.history.location.pathname==='/admin/list' || this.props.history.location.pathname==='/admin'} className={classes.menuItem}>
                            <ListItemText primary="申请资格列表" onClick={this.handleClick.bind(this, 0)}/>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            this.setState({open: !this.state.open})
                        }}>
                            <ListItemText primary="用户中心"/>
                            {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                        </MenuItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <MenuItem className={classes.menuItem}>
                                <ListItemText inset primary="用户" onClick={this.handleClick.bind(this, 1)}/>
                            </MenuItem>
                            <MenuItem className={classes.menuItem}>
                                <ListItemText inset primary="群组" onClick={this.handleClick.bind(this, 2)}/>
                            </MenuItem>
                        </Collapse>
                    </MenuList>
                </Drawer>
                <main className={classes.content}>
                    <SwipeableRoutes>
                        <Route exact path="/admin/list" component={ListPage}/>
                        <Route path="/admin/uCenter/user" component={User}/>
                        <Route path="/admin/uCenter/group" component={Group}/>
                    </SwipeableRoutes>
                </main>
            </div>
        )
    }
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);