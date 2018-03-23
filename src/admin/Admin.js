import React, {Component} from 'react';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import axios from 'axios'

class Admin extends Component {

    constructor(props, context) {
        super(props, context);
        axios.get('/api/list/list')
            .then(r=>{
                this.setState({lists:r.data})
            })
    }

    state = {
        lists: []
    };

    classes = {
        card: {
            margin: "150px",
            textAlign: "left"
        },
        media: {
            height: 200,
        }
    };

    handleDel(id) {
        axios.delete('/api/list/delete?id='+id)
            .then(r=>{
                if(r.data.status==='success'){
                    alert('删除成功')
                }else{
                    alert(r.data.error)
                }
            })
            .catch(error=>{
                alert('删除失败')
            })
    }

    handlePass(id) {
        axios.get('/api/list/pass?id='+id)
            .then(r=>{
                if(r.data.status==='success'){
                    alert('邮件发送成功')
                }else{
                    alert(r.data.error)
                }
            })
            .catch(error=>{
                alert('邮件发送失败')
            })
    }

    render() {
        return (
            <div className="Admin">
                {this.state.lists.map((list) =>
                    <Card style={this.classes.card} key={list.ID}>
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

export default Download;
