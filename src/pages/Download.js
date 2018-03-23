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
    classes = {
        card: {
            margin: "150px",
            textAlign: "left"
        },
        media: {
            height: 200,
        }
    };

    state = {
        open: false,
        region: '',
        email: '',
        qq: '',
        introduction: '',
        suggest: ''
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        axios.post("/api/list/add", {
            region: this.state.region,
            email: this.state.email,
            qq: this.state.qq,
            introduction: this.state.introduction,
            suggest: this.state.suggest
        }).then(r => {
            if (r.data.code==0) {
                this.setState({open: false});
                alert('提交成功')
            }else{
                alert('提交失败')
            }
        })
    };

    render() {
        return (
            <div className="Download">
                <Card style={this.classes.card}>
                    <CardMedia
                        style={this.classes.media}
                        image={image}
                    />
                    <CardContent>
                        <Typography variant="headline" component="h2">发布信息</Typography>
                        <hr/>
                        <p>可以将镜像刻录到CD上，作为ISO文件安装，或者使用刻录工具(dd)直接写入U盘。它仅适用于新安装;
                            现有的FireRainOS可以随时用pacman -Syu更新。</p>
                        <Typography variant="headline" component="h2">HTTP直接下载</Typography>
                        <hr/>
                        <p>安装镜像可以通过HTTP从下面列出的软件源下载。请确保下载镜像与镜像相同目录中的md5sums.txt或sha1sums.txt文件的校验和相匹配。</p>
                        <a href="https://mirrors.firerain.xyz/iso">mirrors</a>
                        <p>暂只允许内测人员下载</p>
                        <Button variant="raised" color="primary" onClick={this.handleClickOpen}>内测资格申请</Button>
                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">内测资格申请</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant="headline" component="h2">义务</Typography>
                            <p>1.积极参与内测活动</p>
                            <p>2.及时反馈最新的内测结果</p>
                            <p>3.积极与火雨操作系统官方开发者沟通问题</p>
                            <p>4.对火雨操作系统提出有意义的建议</p>
                            <p>5.不可私自散播内测活动的内容和数据</p>
                            <Typography variant="headline" component="h2">权利</Typography>
                            <p>1.在第一时间体验火雨操作系统的最新开发成果</p>
                            <p>2.提前获取最新的开发计划和动态</p>
                            <p>3.拥有特殊组别和更高的论坛权限</p>
                        </DialogContentText>
                        <TextField autoFocus required margin="normal" id="region" label="地区" type="text"
                                   onChange={(event) => this.setState({region: event.target.value})}
                                   defaultValue={this.state.region}
                                   fullWidth/>
                        <TextField autoFocus required margin="normal" id="email" label="邮箱" type="email"
                                   onChange={(event) => this.setState({email: event.target.value})}
                                   defaultValue={this.state.email}
                                   helperText="请使用常用邮箱，用于接收内部测试团队资格申请的处理结果(可能不会短时间内处理)" fullWidth/>
                        <TextField autoFocus required margin="normal" id="qq" label="QQ" type="text"
                                   onChange={(event) => this.setState({qq: event.target.value})}
                                   defaultValue={this.state.qq}
                                   helperText="用于及时沟通和加入FIreRain内测团队QQ群" fullWidth/>
                        <TextField
                            id="introduction"
                            label="自我介绍"
                            multiline
                            rowsMax="8"
                            margin="normal"
                            onChange={(event) => this.setState({introduction: event.target.value})}
                            defaultValue={this.state.introduction}
                            helperText="请填写 个人介绍+个人能力（电脑方面）"
                            fullWidth
                        />
                        <TextField
                            id="suggest"
                            label="建议"
                            multiline
                            rowsMax="8"
                            margin="normal"
                            onChange={(event) => this.setState({suggest: event.target.value})}
                            defaultValue={this.state.suggest}
                            helperText="请发表您对内部测试团队的建议"
                            fullWidth
                        />
                        <Typography variant="headline" component="h2">交流方式</Typography>
                        {/*<p>1.官方论坛:bbs.firerain.xyz</p>*/}
                        <p>1.FireRainOS内测团队QQ群</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            提交
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Download;
