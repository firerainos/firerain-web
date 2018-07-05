import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Admin from "./admin/Admin";
import Login from "./admin/Login";
import Signup from "./pages/Signup";
import PageFrame from './pages/Frame';
import {CssBaseline} from "@material-ui/core";

class App extends Component {
    // state = {
    //     value: 0,
    // };
    //
    // router = ['/', '/download', '/package'];
    //
    // handleChange = (event, value) => {
    //     if (value === 3) {
    //         window.location.href = 'https://wiki.firerain.xyz';
    //     } else {
    //         this.setState({value});
    //         this.props.history.push(this.router[value])
    //     }
    // };
    //
    // componentWillReceiveProps(props) {
    //     this.state.value = this.router.indexOf(props.location.pathname)
    // }

    render() {
        return (
            <div className="App">
                <CssBaseline />
                <Switch>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/" component={PageFrame}/>
                </Switch>
            </div>
        );
    }
}

export default App;
