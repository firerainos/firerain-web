import React, { Component } from 'react';
import logo from './logo.png';
import Button from 'material-ui/Button'
import { withRouter } from 'react-router-dom'

class Home extends Component {
    classes = {
        Home: {
            background: '#3F51B5',
            height: '800px'
        }, logo: {
            height: '250px',
            width: '250px',
            marginTop: '100px'
        }, title: {
            color: 'white'
        }
    };

    render() {
        return (
            <div style={this.classes.Home}>
                <img src={logo} alt="logo" style={this.classes.logo}/>
                <h1 style={this.classes.title}>FireRain OS</h1>
                <Button variant="raised" color="secondary" onClick={ () => this.props.history.push('/download')}>立即下载</Button>
            </div>
        )
    }
}

export default withRouter(Home);
