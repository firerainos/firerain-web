import React, {Component} from 'react'
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Avatar, Button, FormControlLabel, Paper, Switch, TextField, Typography} from "@material-ui/core";
import Cookies from 'js-cookie';
import axios from 'axios'

const styles = theme => ({
    root: {
        height: 700,
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
    },
    button: {
        textAlign: 'right',
        marginRight: 30
    }

});

class Profile extends Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        user: {Username: '', Nickname: '', Email: '', Password: ''},
        group: '',
        editPassword: false
    };

    componentDidMount() {
        let user = Cookies.getJSON('user');
        if (user === undefined)
            return
        let group = '';
        for (let i = 0; i < user.Group.length; i++) {
            group += user.Group[i].Name;
            if (i !== user.Group.length - 1) {
                group += ',';
            }
        }
        this.setState({user: user, group: group})
    }

    handleEdit = () => {
        let data={
            nickname:this.state.user.Nickname
        }
        if (this.state.editPassword) {
            data={...data,password:this.state.user.Password}
        }

        axios.patch('/api/userCenter/user/'+this.state.user.ID,data)
            .then(r=>{
                if (r.data.code === 0) {
                    Cookies.set('user',{...this.state.user,Password:''})
                    alert("修改成功")
                }else{
                    alert("修改失败!"+r.data.message)
                }
            })
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
                        onChange={(event) => this.setState({user: {...this.state.user,Nickname:event.target.value}})}
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
                <p>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.editPassword}
                                onChange={() => {
                                    this.setState({editPassword: !this.state.editPassword})
                                }}
                                color="primary"
                            />
                        }
                        label="修改密码"
                    />
                    <br/>
                    <TextField
                        label="密码"
                        type="password"
                        value={this.state.user.Password}
                        margin="normal"
                        disabled={!this.state.editPassword}
                        onChange={(event) => this.setState({user: {...this.state.user,Password:event.target.value}})}
                    />
                </p>
                <p className={classes.button}>
                    <Button variant="raised" color="primary" onClick={this.handleEdit}>确认修改</Button>
                </p>
            </Paper>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);