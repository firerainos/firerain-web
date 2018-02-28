import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import {Link} from "react-router-dom";

class AppFooter extends Component {

    classes = {
        root: {
            overflow: 'auto',
            textAlign:'left',
            background:'#FAFAFA',
            marginTop: '48px'
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
    };

    render() {
        return (
            <footer style={this.classes.root}>
                <div style={this.classes.layout}>
                    <Typography variant="title" gutterBottom>
                        Quick Links
                    </Typography>
                    <Typography variant="subheading" component="div">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={6}>
                                <ul style={this.classes.list}>
                                    <li style={this.classes.listItem}>
                                        <a href="https://github.com/firerainos">GitHub</a>
                                    </li>
                                    <li style={this.classes.listItem}>
                                        <a href="https://bbs.firerain.xyz">Community</a>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ul style={this.classes.list}>
                                    <li style={this.classes.listItem}>
                                        <a href="https://www.archlinux.org">Arch Linux</a>
                                    </li>
                                    <li style={this.classes.listItem}>
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

export default AppFooter