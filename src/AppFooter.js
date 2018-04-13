import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import {Link} from "react-router-dom";
import {withStyles} from "material-ui/styles/index";
import PropTypes from "prop-types";

const styles = theme => ({
    root: {
        position: 'absolute',
        overflow: 'auto',
        textAlign:'left',
        background:'#f7f7f7',
        left: 0,
        right: 0,
        bottom:0
    },
    layout: {
        padding: '48px',
    },
    list: {
        margin: 0,
        paddingLeft: 0,
        listStyle: 'none',
    },
    listItem: {
        paddingTop: '4px',
        paddingBottom: '4px',
    }
});

class AppFooter extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {classes} = this.props;

        return (
            <footer className={classes.root}>
                <div className={classes.layout}>
                    <Typography variant="title" gutterBottom>
                        Quick Links
                    </Typography>
                    <Typography variant="subheading" component="div">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={6}>
                                <ul className={classes.list}>
                                    <li className={classes.listItem}>
                                        <a href="https://github.com/firerainos">GitHub</a>
                                    </li>
                                    <li className={classes.listItem}>
                                        <a href="https://bbs.firerain.xyz">Community</a>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ul className={classes.list}>
                                    <li className={classes.listItem}>
                                        <a href="https://www.archlinux.org">Arch Linux</a>
                                    </li>
                                    <li className={classes.listItem}>
                                        <a href="https://wiki.archlinux.org">Arch Wiki</a>
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>
                    </Typography>
                </div>
            </footer>
        );
    }
}

AppFooter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppFooter);