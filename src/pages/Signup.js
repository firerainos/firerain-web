import React, {Component} from 'react';
import {Card,CardActions, CardContent, CardHeader,Button,TextField} from '@material-ui/core';
import axios from 'axios'
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    card: {
        maxWidth: 500,
        margin: "auto",
        marginTop: "18%"
    },
    signup: {
        textAlign: "center",
    }
});

class Signup extends Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        username: '',
        nickname: '',
        email: '',
        password: '',
    };

    handleSignup = () => {
        axios.post("/api/signup", {
            username: this.state.username,
            nickname: this.state.nickname,
            email: this.state.email,
            password: this.state.password
        }).then(r => {
            if (r.data.code == 0) {
                alert("注册成功")
                this.props.history.push("/")
            } else {
                alert(r.data.message)
            }
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.signup}>
                <Card raised className={classes.card}>
                    <CardHeader title="注册"/>
                    <CardContent>
                        <TextField label="用户名"
                                   onChange={(event) => this.setState({username: event.target.value})}
                                   defaultValue={this.state.username}
                                   fullWidth
                                   margin="normal"/>
                        <TextField label="昵称"
                                   onChange={(event) => this.setState({nickname: event.target.value})}
                                   defaultValue={this.state.nickname}
                                   fullWidth
                                   margin="normal"/>
                        <TextField label="邮箱"
                                   onChange={(event) => this.setState({email: event.target.value})}
                                   defaultValue={this.state.email}
                                   fullWidth
                                   margin="normal"/>
                        <TextField label="密码"
                                   type="password"
                                   onChange={(event) => this.setState({password: event.target.value})}
                                   defaultValue={this.state.password}
                                   fullWidth
                                   margin="normal"/>
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.handleSignup}>注册</Button>
                    </CardActions>
                </Card>
            </div>
        )

    }

    componentDidMount() {
        document.getElementsByTagName("body")[0].style = "background: url(\"https://bing.ioliu.cn/v1/rand\") no-repeat center center fixed;\n" +
            "            -webkit-background-size: cover;\n" +
            "            -moz-background-size: cover;\n" +
            "            -o-background-size: cover;\n" +
            "            background-size: cover;\n" +
            "            position: relative;"
    }

    componentWillUnmount() {
        document.getElementsByTagName("body")[0].removeAttribute("style")
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);