import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import User from "./pages/User";
import Group from "./pages/Group";
import Item from "./pages/Item";
import Package from "./pages/Package";
import {
    AppBar,
    Collapse,
    Divider,
    Drawer,
    ListItemText, MenuItem,
    MenuList,
    Toolbar
} from "material-ui";
import {Route} from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import ListPage from "./pages/List"
import {ExpandLess, ExpandMore} from "material-ui-icons";
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

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
        width: 'calc(100% - 200px)',
    },
    root: {
        flexGrow: 1,
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
        let user = Cookies.getJSON('user');
        if (user!==undefined){
            for (let i = 0; i < user.Group.length; i++) {
                if (user.Group[i].Name === 'admin')
                    return
            }
        }
        this.props.history.push('/login');
    }

    state = {
        UCOpen: true,
        installOpen: true
    };

    handleClick(id) {
        let tmp = ['/admin/list', '/admin/uCenter/user', '/admin/uCenter/group', '/admin/installer/item', '/admin/installer/package']
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
                            this.setState({UCOpen: !this.state.UCOpen})
                        }}>
                            <ListItemText primary="用户中心"/>
                            {this.state.UCOpen ? <ExpandLess/> : <ExpandMore/>}
                        </MenuItem>
                        <Collapse in={this.state.UCOpen} timeout="auto" unmountOnExit>
                            <MenuItem className={classes.menuItem}>
                                <ListItemText inset primary="用户" onClick={this.handleClick.bind(this, 1)}/>
                            </MenuItem>
                            <MenuItem className={classes.menuItem}>
                                <ListItemText inset primary="群组" onClick={this.handleClick.bind(this, 2)}/>
                            </MenuItem>
                        </Collapse>
                        <MenuItem onClick={() => {
                            this.setState({installOpen: !this.state.installOpen})
                        }}>
                            <ListItemText primary="安装器"/>
                            {this.state.installOpen ? <ExpandLess/> : <ExpandMore/>}
                        </MenuItem>
                        <Collapse in={this.state.installOpen} timeout="auto" unmountOnExit>
                            <MenuItem className={classes.menuItem}>
                                <ListItemText inset primary="item" onClick={this.handleClick.bind(this, 3)}/>
                            </MenuItem>
                            <MenuItem className={classes.menuItem}>
                                <ListItemText inset primary="package" onClick={this.handleClick.bind(this, 4)}/>
                            </MenuItem>
                        </Collapse>
                    </MenuList>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <SwipeableRoutes>
                        <Route exact path="/admin/list" component={ListPage}/>
                        <Route path="/admin/uCenter/user" component={User}/>
                        <Route path="/admin/uCenter/group" component={Group}/>
                        <Route path="/admin/installer/item" component={Item}/>
                        <Route path="/admin/installer/package" component={Package}/>
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