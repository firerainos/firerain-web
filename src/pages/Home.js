import React, {Component} from 'react';
import logo from '../logo.png';
import Button from '@material-ui/core/Button'
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
    header: {
        background: theme.palette.primary.main,
        height: '800px',
        color: 'white'
    },
    logo: {
        height: '250px',
        width: '250px',
        marginTop: '180px'
    },
    info: {
        paddingTop:48,
        paddingBottom:48
    }
});

class Home extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <div className={classes.header}>
                    <img src={logo} alt="logo" className={classes.logo}/>
                    <h1>FireRain OS</h1>
                    <p>FireRainOS是基于Arch Linux的用户友好的Linux发行版,提供图形操作,并保证Arch的原生性</p>
                    <Button variant="raised" color="secondary"
                            onClick={() => this.props.history.push('/download')}>立即下载</Button>
                </div>
                <div className={classes.info}>
                    <h2>支持我们</h2>
                    <p>通过你的贡献、捐款或者赞助，FireRainOS 将获得繁荣发展。你的捐助直接用于支持我们付出工作、持续改进，最加重要的是有助于我们提供优秀的文档和资料！</p>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);