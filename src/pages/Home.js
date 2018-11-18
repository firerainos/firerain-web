import React, { Component } from 'react'
import logo from '../logo.png'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import FireRainISO from '../firerainiso.svg'
import FireRainDesktopISO from '../fireraindesktopiso.svg'

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
        paddingTop: 48,
        paddingBottom: 48
    },
    image: {
        padding: 48,
        background: '#272f43',
        color: 'white'
    },
    isoList: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    isoItem: {
        padding: 40,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 400,
        },
    }
})

class Home extends Component {
    constructor (props, context) {
        super(props, context)
    }

    render () {
        const {classes} = this.props

        return (
            <div>
                <div className={classes.header}>
                    <img src={logo} alt="logo" className={classes.logo}/>
                    <h1>FireRain OS</h1>
                    <p>FireRainOS是基于Arch Linux的用户友好的Linux发行版,提供图形操作,并保证Arch的原生性</p>
                    <Button variant="raised" color="secondary"
                            onClick={() => this.props.history.push('/download')}>立即下载</Button>
                </div>
                <div className={classes.image}>
                    <h2>FireRain 安装镜像</h2>
                    <div className={classes.isoList}>
                        <div className={classes.isoItem}>
                            <img src={FireRainISO} alt="firerainiso"/>
                            <h4>FireRain Live ISO</h4>
                            <List>
                                <ListItem>
                                    <span>与ARCHISO类似</span>
                                </ListItem>
                                <ListItem>
                                    <span>镜像体积小</span>
                                </ListItem>
                            </List>
                        </div>
                        <div className={classes.isoItem}>
                            <img src={FireRainDesktopISO} alt="fireraindesktopiso"/>
                            <h4>FireRain Desktop ISO</h4>
                            <List>
                                <ListItem>
                                    <span>内置图形化安装器</span>
                                </ListItem>
                                <ListItem>
                                    <span>多种桌面环境自由选择</span>
                                </ListItem>
                            </List>
                        </div>
                    </div>
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
}

export default withStyles(styles)(Home)