import React, {Component} from 'react';
import axios from 'axios'
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel, TextField,
    Tooltip
} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
});

class Item extends Component {

    constructor(props, context) {
        super(props, context);
    }

    state = {
        items: [],
        item: {},
        dialogTitle: '',
        dialogContext: '',
        dialogOpen: false,
        dialogEdit: false
    };

    componentDidMount() {
        this.getItems()
    }

    getItems() {
        axios.get('/api/item')
            .then(r => {
                if (r.data.code === 0) {
                    this.setState({items: r.data.items})
                }
            })
    }

    handleDel(id) {
        axios.delete('/api/item/'+id)
            .then(r => {
                if (r.data.code === 0) {
                    alert('删除成功')
                    this.getItems()
                } else {
                    alert('删除失败!' + r.data.message)
                }
            })
    }

    handleEdit(item) {
        if (this.state.dialogOpen === true) {
            this.setState({dialogOpen: false})
            axios.put('/api/item/'+this.state.item.ID, {
                name: this.state.item.name,
                title: this.state.item.title
            })
                .then(r => {
                    if (r.data.code === 0) {
                        alert('编辑成功')
                        this.getItems()
                    } else {
                        alert('编辑失败!' + r.data.message)
                    }
                })
        } else {
            this.setState({item: item, dialogOpen: true, dialogEdit: true})
        }
    }

    handleAdd =()=> {
        if (this.state.dialogOpen === true) {
            this.setState({dialogOpen: false})
            axios.post('/api/item', {
                name: this.state.item.name,
                title: this.state.item.title
            })
                .then(r => {
                    if (r.data.code === 0) {
                        alert('添加成功')
                        this.getItems()
                    } else {
                        alert('添加失败!' + r.data.message)
                    }
                })
        } else {
            this.setState({dialogOpen: true, dialogEdit: false, item: {}})
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
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
                                        标题
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
                        {this.state.items.map((item) => {
                            return (
                                <TableRow key={item.ID}>
                                    <TableCell>
                                        {item.ID}
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.title}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Edit" onClick={this.handleEdit.bind(this, item)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="Delete" onClick={this.handleDel.bind(this, item.ID)}>
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
                    onClose={this.handleClose}item
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.dialogEdit ? '编辑条目' : '新建条目'}</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus required margin="normal" id="name" label="名称" type="text"
                                   onChange={(event) => this.setState({item: {...this.state.item,name: event.target.value}})}
                                   defaultValue={this.state.item.name}
                                   fullWidth/>
                        <TextField autoFocus required margin="normal" id="title" label="标题" type="text"
                                   onChange={(event) => this.setState({item: {...this.state.item,title: event.target.value}})}
                                   defaultValue={this.state.item.title}
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

Item.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Item);