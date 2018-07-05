import React, {Component} from 'react';
import {Card, CardActions, CardContent, CardHeader, Button, TextField} from '@material-ui/core';
import axios from 'axios'
import Cookies from 'js-cookie'

class Login extends Component {
    classes = {
        card: {
            maxWidth:500,
            margin:"auto",
            marginTop:"18%"
        },
        login:{
            textAlign:"center",
        }
    };

    state = {
        username: '',
        password: ''
    };

    handleLogin= () =>{
        axios.post("/api/login",{
            username:this.state.username,
            password:this.state.password
        }).then(r=>{
            if (r.data.code == 0) {
                Cookies.set('user', r.data.user, { path: '/' });
                this.props.history.push("/")
            }else if (r.data.code == 100) {
                alert("用户名或密码错误")
            }else{
                alert("登录失败")
            }
        })
    }

    render() {
        return (
            <div style={this.classes.login}>
                <Card raised style={this.classes.card}>
                    <CardHeader title="登录"/>
                    <CardContent>
                        <TextField label="用户名"
                                   onChange={(event) => this.setState({username: event.target.value})}
                                   defaultValue={this.state.username}
                                   fullWidth/>
                    </CardContent>
                    <CardContent>
                        <TextField label="密码"
                                   type="password"
                                   onChange={(event) => this.setState({password: event.target.value})}
                                   defaultValue={this.state.password}
                                   fullWidth/>
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.handleLogin}>登录</Button>
                    </CardActions>
                </Card>
            </div>
        )

    }

    componentDidMount(){
        document.getElementsByTagName("body")[0].style="background: url(\"https://bing.ioliu.cn/v1/rand\") no-repeat center center fixed;\n" +
            "            -webkit-background-size: cover;\n" +
            "            -moz-background-size: cover;\n" +
            "            -o-background-size: cover;\n" +
            "            background-size: cover;\n" +
            "            position: relative;"
    }

    componentWillUnmount(){
        document.getElementsByTagName("body")[0].removeAttribute("style")
    }
}

export default Login;