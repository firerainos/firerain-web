import React, {Component} from 'react';
import Button from 'material-ui/Button';
import axios from 'axios'
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel, TextField,
    Tooltip
} from "material-ui";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
});

class Package extends Component {

    constructor(props, context) {
        super(props, context);
        this.getPackages()
    }

    state = {
        packages: [],
        package: {},
        dialogTitle: '',
        dialogContext: '',
        dialogOpen: false,
        dialogEdit: false
    };

    componentDidMount() {
        this.getPackages()
    }

    getPackages() {
        axios.get('/api/package')
            .then(r => {
                console.log(r.data)
                if (r.data.code == 0) {
                    this.setState({packages: r.data.packages})
                }
            })
    }

    handleDel(id) {
        axios.delete('/api/package/'+id)
            .then(r => {
                if (r.data.code == 0) {
                    alert('删除成功')
                    this.getPackages()
                } else {
                    alert('删除失败!' + r.data.message)
                }
            })
    }

    handleEdit(pkg) {
        if (this.state.dialogOpen === true) {
            this.setState({dialogOpen: false})
            axios.put('/api/package/'+this.state.package.ID, {
                itemID: Number(this.state.package.itemID),
                name: this.state.package.name,
                description: this.state.package.description
            })
                .then(r => {
                    if (r.data.code == 0) {
                        alert('编辑成功')
                        this.getPackages()
                    } else {
                        alert('编辑失败!' + r.data.message)
                    }
                })
        } else {
            this.setState({package: pkg, dialogOpen: true, dialogEdit: true})
        }
    }

    handleAdd =()=> {
        if (this.state.dialogOpen === true) {
            this.setState({dialogOpen: false})
            axios.post('/api/package', {
                itemID: Number(this.state.package.itemID),
                name: this.state.package.name,
                description: this.state.package.description
            })
                .then(r => {
                    if (r.data.code == 0) {
                        alert('添加成功')
                        this.getPackages()
                    } else {
                        alert('添加失败!' + r.data.message)
                    }
                })
        } else {
            this.setState({dialogOpen: true, dialogEdit: false, package: {}})
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <div className={classes.toolbar}/>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel>
                                        ID
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel>
                                        条目ID
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel>
                                        名称
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel>
                                        描述
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="Add"
                                            onClick={this.handleAdd}>
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.packages.map((pkg) => {
                            return (
                                <TableRow key={pkg.ID}>
                                    <TableCell>
                                        {pkg.ID}
                                    </TableCell>
                                    <TableCell>
                                        {pkg.itemID}
                                    </TableCell>
                                    <TableCell>
                                        {pkg.name}
                                    </TableCell>
                                    <TableCell>
                                        {pkg.description}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Edit" onClick={this.handleEdit.bind(this, pkg)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="Delete" onClick={this.handleDel.bind(this, pkg.ID)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        }, this)}
                    </TableBody>
                </Table>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.dialogEdit ? '编辑条目' : '新建条目'}</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus required margin="normal" id="itemID" label="条目ID" type="text"
                                   onChange={(event) => this.setState({package: {...this.state.package,itemID: event.target.value}})}
                                   defaultValue={this.state.package.itemID}
                                   fullWidth/>
                        <TextField autoFocus required margin="normal" id="name" label="名称" type="text"
                                   onChange={(event) => this.setState({package: {...this.state.package,name: event.target.value}})}
                                   defaultValue={this.state.package.name}
                                   fullWidth/>
                        <TextField autoFocus required margin="normal" id="description" label="描述" type="text"
                                   onChange={(event) => this.setState({package: {...this.state.package,description: event.target.value}})}
                                   defaultValue={this.state.package.description}
                                   fullWidth/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({dialogOpen: false})} color="primary">
                            取消
                        </Button>
                        {this.state.dialogEdit ?
                            <Button onClick={this.handleEdit.bind(this)} color="primary" autoFocus>
                                确定
                            </Button> :
                            <Button onClick={this.handleAdd.bind(this)} color="primary" autoFocus>
                                确定
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

Package.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Package);