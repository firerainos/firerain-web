import React, {Component} from 'react';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import image from '../welcome_card.jpg'
import TextField from 'material-ui/TextField';
import axios from 'axios'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class Download extends Component {

    constructor(props, context) {
        super(props, context);
        axios.get('/api/list/list')
            .then(r=>{
                this.setState('lists',r.data)
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

    render() {
        return (
            <div className="Admin">
                <Card style={this.classes.card}>
                    <CardContent>

                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Download;
