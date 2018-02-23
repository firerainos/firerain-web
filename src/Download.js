import React, { Component } from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import image from './welcome_card.jpg'

class Download extends Component {
    classes = {
        card:{
            margin: "150px",
            textAlign: "left"
        },
        media:{
            height: 200,
        }
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
                        <Button variant="raised" color="primary">内测资格申请</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Download;
