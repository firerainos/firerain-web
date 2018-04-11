import React, {Component} from 'react'
import {withStyles} from "material-ui/styles/index";
import PropTypes from "prop-types";
import {Avatar, Paper, TextField, Typography} from "material-ui";
import Cookies from 'js-cookie';

const styles = theme => ({
    root: {
        height: 550,
        width: 600,
        margin: 'auto',
        marginTop: 100,
        paddingTop: 50,
    },
    avatar: {
        marginBottom: 30,
        margin: 'auto',
        width: 100,
        height: 100,
    },
    username: {
        margin: 'auto'
    }
});

class Profile extends Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        user: Cookies.getJSON('user'),
        group: ''
    };

    componentDidMount() {
        let group = '';
        for (let i = 0; i < this.state.user.Group.length; i++) {
            group += this.state.user.Group[i].Name;
            if (i !== this.state.user.Group.length - 1) {
                group += ',';
            }
        }
        this.setState({group: group})
    }

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
                <Avatar src={"/api/avatar/" + this.state.user.Username} className={classes.avatar}/>
                <Typography variant="title" color="inherit">
                    {this.state.user.Username}
                </Typography>
                <p>
                    <TextField
                        label="昵称"
                        value={this.state.user.Nickname}
                        margin="normal"
                    />
                </p>
                <p>
                    <TextField
                        label="邮箱"
                        value={this.state.user.Email}
                        margin="normal"
                        disabled
                    />
                </p>
                <p>
                    <TextField
                        label="所属组"
                        value={this.state.group}
                        margin="normal"
                        disabled
                    />
                </p>
            </Paper>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);