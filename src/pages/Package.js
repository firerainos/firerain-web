import React, { Component } from 'react'
import {
    TextField,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    TablePagination
} from '@material-ui/core'
import axios from 'axios'
import PropTypes from 'prop-types'
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 3,
        [theme.breakpoints.up('md')]: {
            padding: '5%',
        },
    },
    tableList: {
        marginTop: theme.spacing.unit * 5,
    },
    search: {
        textAlign: 'left',
        padding: theme.spacing.unit * 3,
        spacing: theme.spacing.unit * 3
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    a: {
        textDecoration: 'none'
    }
})

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

class Package extends Component {
    state = {
        arches: [],
        repos: [],
        maintainers: [],
        flaggeds: [],
        packages: [],
        arch: '',
        repo: '',
        maintainer: '',
        flagged: '',
        query: '',
        num: 0,
        pages: 0,
        page: 0
    }

    search () {
        axios.get('/api/search', {
            params: {
                'arch': this.state.arch,
                'repo': this.state.repo,
                'query': this.state.query,
                'maintainer': this.state.maintainer,
                'flagged': this.state.flagged,
                'page': this.state.page + 1,
            }
        })
            .then(r => {
                this.setState({packages: r.data.packages, num: r.data.num, pages: r.data.pages})
            })
    }

    componentWillMount () {
        axios.get('/api/search/arch')
            .then(r => {
                this.setState({arches: r.data.arch})
            })
        axios.get('/api/search/repo')
            .then(r => {
                this.setState({repos: r.data.repo})
            })
        axios.get('/api/search/maintainer')
            .then(r => {
                this.setState({maintainers: r.data.maintainer})
            })
        axios.get('/api/search/flagged')
            .then(r => {
                this.setState({flaggeds: r.data.flagged})
            })

        this.search()
    }

    handleChangePage = (event, page) => {
        this.state.page = page
        this.search()
    }

    render () {
        const {classes} = this.props

        return (
            <div className={classes.root}>
                <Paper className={classes.search}>
                    <TextField
                        select
                        label="Arch"
                        className={classes.textField}
                        value={this.state.arch}
                        onChange={event => {this.setState({arch: event.target.value})}}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    >
                        <MenuItem value="">
                            All
                        </MenuItem>
                        {this.state.arches.map(arch => (
                            <MenuItem value={arch.Value}>
                                {arch.Text}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Repository"
                        className={classes.textField}
                        value={this.state.repo}
                        onChange={event => {this.setState({repo: event.target.value})}}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    >
                        <MenuItem value="">
                            All
                        </MenuItem>
                        {this.state.repos.map(repo => (
                            <MenuItem value={repo.Value}>
                                {repo.Text}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Maintainer"
                        className={classes.textField}
                        value={this.state.maintainer}
                        onChange={event => {this.setState({maintainer: event.target.value})}}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    >
                        {this.state.maintainers.map(maintainer => (
                            <MenuItem value={maintainer.Value}>
                                {maintainer.Text}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Flagged"
                        className={classes.textField}
                        value={this.state.flagged}
                        onChange={event => {this.setState({flagged: event.target.value})}}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    >
                        {this.state.flaggeds.map(flagged => (
                            <MenuItem value={flagged.Value}>
                                {flagged.Text}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="关键字"
                        margin="normal"
                        className={classes.textField}
                        onChange={event => {this.setState({query: event.target.value})}}
                    />
                    <Button variant="raised" color="primary" onClick={() => {this.search()}}>搜索</Button>
                </Paper>
                <Paper className={classes.tableList}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Arch</CustomTableCell>
                                <CustomTableCell>Repo</CustomTableCell>
                                <CustomTableCell>Name</CustomTableCell>
                                <CustomTableCell>Version</CustomTableCell>
                                <CustomTableCell>Description</CustomTableCell>
                                <CustomTableCell>Last Updated</CustomTableCell>
                                <CustomTableCell>Flag Date</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.packages.map(pkg => {
                                return (
                                    <TableRow className={classes.row}>
                                        <CustomTableCell component="th" scope="row">
                                            {pkg.Arch}
                                        </CustomTableCell>
                                        <CustomTableCell>{pkg.Repository}</CustomTableCell>
                                        <CustomTableCell><a className={classes.a} href={"https://www.archlinux.org/packages/"+pkg.Repository+"/"+pkg.Arch+"/"+pkg.Name}>{pkg.Name}</a></CustomTableCell>
                                        <CustomTableCell>{pkg.Version}</CustomTableCell>
                                        <CustomTableCell>{pkg.Description}</CustomTableCell>
                                        <CustomTableCell>{pkg.LastUpdated}</CustomTableCell>
                                        <CustomTableCell>{pkg.FlagDate}</CustomTableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={this.state.num}
                        rowsPerPage={100}
                        rowsPerPageOptions={[]}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': '上一页',
                        }}
                        nextIconButtonProps={{
                            'aria-label': '下一页',
                        }}
                        onChangePage={this.handleChangePage}
                    />
                </Paper>
            </div>
        )
    }
}

Package.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Package)