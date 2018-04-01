import React, {Component} from 'react';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import axios from 'axios'
import {
    Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader,
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

class Group extends Component {

    constructor(props, context) {
        super(props, context);
        this.getGroups()
    }

    state = {
        groups: [],
        group: {},
        dialogTitle: '',
        dialogContext: '',
        dialogOpen: false,
        dialogEdit: false
    };

    getGroups() {
        axios.get('/api/userCenter/group')
            .then(r => {
                if (r.data.code == 0) {
                    this.setState({groups: r.data.groups})
                } else if (r.data.code == 101) {
                    this.props.history.push("/login")
                }
            })
    }

    handleDel(name) {
        axios.delete('/api/userCenter/group/'+name)
            .then(r => {
                if (r.data.code == 0) {
                    alert('删除成功')
                    this.getGroups()
                } else {
                    alert('删除失败!' + r.data.message)
                }
            })
    }

    handleEdit(group) {
        if (this.state.dialogOpen === true) {

        } else {
            this.setState({group: group, dialogOpen: true, dialogEdit: true})
        }
    }

    handleAdd() {
        if (this.state.dialogOpen === true) {
            this.setState({dialogOpen: false})
            console.log(this.state.group)
            axios.post('/api/userCenter/group', {
                group: this.state.group.Name,
                description: this.state.group.Description
            })
                .then(r => {
                    if (r.data.code == 0) {
                        alert('添加成功')
                        this.getGroups()
                    } else {
                        alert('添加失败!' + r.data.message)
                    }
                })
        } else {
            this.setState({dialogOpen: true, dialogEdit: false, group: {}})
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className="Group">
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
                                        群组名
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
                                            onClick={this.handleAdd.bind(this)}>
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.groups.map((group) => {
                            return (
                                <TableRow key={group.ID}>
                                    <TableCell>
                                        {group.Name}
                                    </TableCell>
                                    <TableCell>
                                        {group.Description}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Edit" onClick={this.handleEdit.bind(this, group)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="Delete" onClick={this.handleDel.bind(this, group.Name)}>
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
                    <DialogTitle id="alert-dialog-title">{this.state.dialogEdit ? '编辑群组' : '新建群组'}</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus required margin="normal" id="name" label="群组名" type="text"
                                   onChange={(event) => this.setState({group: {...this.state.group,Name: event.target.value}})}
                                   defaultValue={this.state.group.Name}
                                   fullWidth/>
                        <TextField autoFocus required margin="normal" id="description" label="描述" type="text"
                                   onChange={(event) => this.setState({group: {...this.state.group,Description: event.target.value}})}
                                   defaultValue={this.state.group.Description}
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

Group.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Group);
