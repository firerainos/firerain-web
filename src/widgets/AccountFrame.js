import React,{Component} from 'react'
import {Avatar, IconButton, Menu, MenuItem, Typography} from "material-ui";
import Cookies from 'js-cookie'
import MoreVertIcon from 'material-ui-icons/MoreVert';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    root:{
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
        width: 35,
        height: 35,
    },
    username:{
        margin:'auto'
    }

});

class AccountFrame extends Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        anchorEl: null,
        user: Cookies.getJSON('user'),
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = index => {
        switch (index) {
            case 0:
                this.props.history.push("/profile");
                break;
            case 1:
                this.props.history.push("/admin");
                break;
            case 2:
                this.props.onLogup();
                break;
        }
        this.setState({ anchorEl: null });
    };

    hasAdminGroup(){
        for (let i = 0; i < this.state.user.Group.length; i++) {
            if (this.state.user.Group[i].Name === 'admin') {
                return true
            }
        }
        return false
    }

    render() {
        const {classes} = this.props;
        const open = Boolean(this.state.anchorEl)

        return (
            <div className={classes.root}>
                <Avatar src={"/api/avatar/"+this.state.user.Username} className={classes.avatar}/>
                <Typography variant="title" color="inherit" className={classes.username}>
                    {this.state.user.Username}
                </Typography>
                <IconButton
                    aria-owns={open ? 'menu-account' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color="inherit"
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="menu-account"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose.bind(this,0)}>个人中心</MenuItem>
                    {this.hasAdminGroup() && <MenuItem onClick={this.handleClose.bind(this,1)}>后台管理</MenuItem>}
                    <MenuItem onClick={this.handleClose.bind(this,2)}>退出</MenuItem>
                </Menu>
            </div>
        );
    }
}

AccountFrame.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AccountFrame));