import React, { Component } from 'react';
import logo from './logo.png';
import './Home.css'
import Button from 'material-ui/Button'

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <img src={logo} alt="logo" className="logo"/>
                <h1 className="title">FireRain OS</h1>
                <Button variant="raised" color="secondary">立即下载</Button>
            </div>
        )
    }
}

export default Home;
