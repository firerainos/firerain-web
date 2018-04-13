import React, {Component} from 'react';
import Button from 'material-ui/Button';
import axios from 'axios'
import {
    Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, List, ListItem, ListItemText, ListSubheader,
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
});

class User extends Component {

    constructor(props, context) {
        super(props, context);
    }

    state = {
        users: [],
        groups: [],
        user: {},
        checkedList: [],
        dialogTitle: '',
        dialogContext: '',
        dialogOpen: '',
        dialogEdit: false
    };

    componentDidMount() {
        this.getUsers()
        this.getGroups()
    }

    getUsers() {
        axios.get('/api/userCenter/user')
            .then(r => {
                if (r.data.code == 0) {
                    this.setState({users: r.data.users})
                } else if (r.data.code == 101) {
                    this.props.history.push("/login")
                }
            })
    }

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

    handleDel(id) {
        axios.delete('/api/userCenter/user/' + id)
            .then(r => {
                if (r.data.code == 0) {
                    alert('删除成功')
                    this.getUsers()
                } else {
                    alert('删除失败!' + r.data.message)
                }
            })
    }

    handleEdit(user) {
        if (this.state.dialogOpen === true) {

        } else {
            let list = []
            for (let i in this.state.groups) {
                let tmp = false
                for (let j in user.Group) {
                    if (user.Group[j].Name === this.state.groups[i].Name) {
                        tmp = true
                        break
                    }
                }
                list.push({Name: this.state.groups[i].Name, checked: tmp})
            }
            this.setState({user: user, checkedList: list, dialogOpen: true, dialogEdit: true})
        }
    }

    handleAdd() {
        if (this.state.dialogOpen === true) {
            this.setState({dialogOpen: false})
            let list = this.getGroupList()
            axios.post("/api/userCenter/user",{
                username:this.state.user.Username,
                nickname:this.state.user.Nickname,
                password:this.state.user.Password,
                email:this.state.user.Email,
                group:list
            }).then(r=>{
                if (r.data.code == 0) {
                    alert('添加成功')
                    this.getUsers()
                } else {
                    alert('添加失败!' + r.data.message)
                }
            })
        } else {
            let list = []
            for (let i in this.state.groups) {
                list.push({Name: this.state.groups[i].Name, checked: false})
            }
            this.setState({user: {}, checkedList: list, dialogOpen: true, dialogEdit: false})
        }
    }

    handleEditGroup(list) {
        const newList = [...this.state.checkedList];
        for (let i in newList) {
            if (newList[i].Name === list.Name) {
                newList[i].checked = !list.checked
                break
            }
        }

        this.setState({checkedList: newList})
    }

    getGroupList(){
        let list = []
        for (let i in this.state.checkedList) {
            if (this.state.checkedList[i].checked) {
                list.push(this.state.checkedList[i].Name)
            }
        }
        return list
    }

    render() {
        const {classes} = this.props;

        return (
            <div className="User">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel>
                                        用户名
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel>
                                        昵称
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel>
                                        邮箱
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                    >
                                        群组
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="Add" onClick={this.handleAdd.bind(this)}>
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map((user) => {
                            return (
                                <TableRow key={user.ID}>
                                    <TableCell>
                                        {user.Username}
                                    </TableCell>
                                    <TableCell>
                                        {user.Nickname}
                                    </TableCell>
                                    <TableCell>
                                        {user.Email}
                                    </TableCell>
                                    <TableCell>
                                        {user.Group.map((g) => {
                                            return (
                                                g.Name + ","
                                            );
                                        }, this)}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Edit" onClick={this.handleEdit.bind(this, user)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="Delete" onClick={this.handleDel.bind(this, user.ID)}>
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
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.dialogEdit ? '编辑用户' : '新建用户'}</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus required margin="normal" id="username" label="用户名" type="text"
                                   onChange={(event) => this.setState({
                                       user: {
                                           ...this.state.user,
                                           Username: event.target.value
                                       }
                                   })}
                                   defaultValue={this.state.user.Username}
                                   fullWidth/>
                        <TextField autoFocus required margin="normal" id="nickname" label="昵称" type="text"
                                   onChange={(event) => this.setState({
                                       user: {
                                           ...this.state.user,
                                           Nickname: event.target.value
                                       }
                                   })}
                                   defaultValue={this.state.user.Nickname}
                                   fullWidth/>
                        <TextField autoFocus required margin="normal" id="password" label="密码" type="password"
                                   onChange={(event) => this.setState({
                                       user: {
                                           ...this.state.user,
                                           Password: event.target.value
                                       }
                                   })}
                                   defaultValue={this.state.user.Password}
                                   fullWidth/>
                        <TextField autoFocus required margin="normal" id="email" label="邮箱" type="email"
                                   onChange={(event) => this.setState({
                                       user: {
                                           ...this.state.user,
                                           Email: event.target.value
                                       }
                                   })}
                                   defaultValue={this.state.user.Email}
                                   fullWidth/>
                        <List subheader={<ListSubheader>所属群组</ListSubheader>}>
                            {this.state.checkedList.map(list => (
                                <ListItem key={list.Name}
                                          dense button
                                          onClick={this.handleEditGroup.bind(this, list)}
                                >
                                    <ListItemText primary={list.Name}/>
                                    <Checkbox checked={list.checked}/>
                                </ListItem>
                            ))}
                        </List>
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

User.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
