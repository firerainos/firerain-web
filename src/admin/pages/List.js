import React, {Component} from 'react';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import axios from 'axios'
import {withStyles} from "material-ui/styles/index";
import PropTypes from "prop-types";

const styles = theme => ({
    card: {
        margin: "150px",
        textAlign: "left"
    },
    media: {
        height: 200,
    }
});

class List extends Component {

    constructor(props, context) {
        super(props, context);
    }

    state = {
        lists: []
    };

    componentDidMount() {
        this.getLists()
    }

    getLists(){
        axios.get('/api/list')
            .then(r=>{
                if (r.data.code == 0) {
                    this.setState({lists:r.data.list})
                } else if (r.data.code == 101) {
                    this.props.history.push("/login")
                }
            })
    }

    handleDel(id) {
        axios.delete('/api/list/'+id)
            .then(r=>{
                if(r.data.code==0){
                    alert('删除成功')
                    this.getLists()
                }else{
                    alert('删除失败!'+r.data.message)
                }
            })
    }

    handlePass(id) {
        axios.patch('/api/list/'+id)
            .then(r=>{
                if(r.data.code==0){
                    alert('邮件发送成功')
                    this.getLists()
                }else{
                    alert('邮件发送失败!'+r.data.message)
                }
            })

    }

    render() {
        const {classes} = this.props;

        return (
            <div className="Admin">
                {this.state.lists.map((list) =>
                    <Card className={classes.card} key={list.ID}>
                        <CardContent>
                            <p>{list.CreatedAt}</p>
                            <p>{list.email}</p>
                            <p>{list.qq}</p>
                            <p>{list.region}</p>
                            <p>{list.introduction}</p>
                            <p>{list.suggest}</p>
                            <p>{list.State}</p>
                        </CardContent>
                        <CardActions>
                            <Button onClick={this.handleDel.bind(this,list.ID)}>删除</Button>
                            <Button onClick={this.handlePass.bind(this,list.ID)}>PASS</Button>
                        </CardActions>
                    </Card>
                )}
            </div>
        )
    }
}

List.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(List);
