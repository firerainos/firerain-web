import React, { Component } from 'react'
import Home from './Home'
import Download from './Download'
import Profile from './profile'
import Package from './Package'
import SwipeableRoutes from 'react-swipeable-routes'
import { Link, Route } from 'react-router-dom'
import AppFooter from '../AppFooter'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import AccountFrame from '../widgets/AccountFrame'
import Cookies from 'js-cookie'
import axios from 'axios'
import {
    Divider,
    Drawer,
    IconButton,
    ListItemText,
    MenuItem,
    MenuList,
    Hidden,
    Typography,
    AppBar,
    Tab,
    Tabs,
    Toolbar
} from '@material-ui/core'
import logo from '../logo.png'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'

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
    },
    logo: {
        height: 200,
        width: 200,
    },
    accountAction :{
        margin: 'auto'
    }
})

class Frame extends Component {
    constructor (props, context) {
        super(props, context)
    }

    state = {
        value: 0,
        user: Cookies.getJSON('user'),
        mobileOpen: false
    }

    router = ['/', '/download', '/package']

    handleChange = (event, value) => {
        if (value === 3) {
            window.location.href = 'https://wiki.archlinux.org'
        } else {
            this.setState({value})
            this.props.history.push(this.router[value])
        }
    }

    handleLogup = () => {
        axios.post('/api/logout')
            .then(r => {
                if (r.data.code === 0) {
                    Cookies.remove('user')
                    this.setState({user: undefined})
                } else {
                    alert('退出失败')
                }
            })
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen})
    }

    componentWillReceiveProps (props) {
        this.state.value = this.router.indexOf(props.location.pathname)
    }

    render () {
        const {classes} = this.props

        return (
            <div className={classes.Frame}>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <div className={classes.header}>
                            <img src={logo} alt="logo" className={classes.logo}/>
                            <Typography variant="title">{this.state.title}</Typography>
                        </div>
                        <Divider/>
                        <MenuList>
                            <MenuItem component={Link} to='/'>
                                <ListItemText inset primary="首页"/>
                            </MenuItem>
                            <MenuItem component={Link} to='/download'>
                                <ListItemText inset primary="下载"/>
                            </MenuItem>
                            <MenuItem component={Link} to='/package'>
                                <ListItemText inset primary="Packages"/>
                            </MenuItem>
                            <MenuItem onClick={() => {window.location.href = 'https://wiki.archlinux.org'}}>
                                <ListItemText inset primary="Arch Wiki"/>
                            </MenuItem>
                            <Divider/>
                            <MenuItem component={Link} to='/signup'>
                                <ListItemText inset primary="注册"/>
                            </MenuItem>
                            <MenuItem component={Link} to='/login'>
                                <ListItemText inset primary="登录"/>
                            </MenuItem>
                        </MenuList>
                    </Drawer>
                </Hidden>
                <AppBar position="static">
                    <Toolbar>
                        <Hidden mdUp>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Hidden>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            FireRain
                        </Typography>
                        <Hidden smDown implementation="css">
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
                                {this.state.user === undefined && <div className={classes.accountAction}>
                                    <Button color="inherit" component={Link} to='/signup'>注册</Button>
                                    <Button color='inherit' component={Link} to='/login'>登录</Button>
                                </div>}
                            </Tabs>
                        </Hidden>
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
        )
    }
}

Frame.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Frame)