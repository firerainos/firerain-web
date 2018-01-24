<template>
  <!--<p><a href="http://xiayesuifeng.mikecrm.com/q42IWMW">点击申请内测资格</a></p>-->
  <div class="mdc-typography">
  <mdc-card>
    <mdc-card-header :title="FireRain下载" />
    <mdc-card-text>
      <mdc-headline>发布信息</mdc-headline>
      <hr>
      <p>可以将镜像刻录到CD上，作为ISO文件安装，或者使用刻录工具(dd)直接写入U盘。它仅适用于新安装; 现有的FireRainOS可以随时用pacman -Syu更新。</p>
      <mdc-headline>HTTP直接下载</mdc-headline>
      <hr>
      <p>安装镜像可以通过HTTP从下面列出的软件源下载。请确保下载镜像与镜像相同目录中的md5sums.txt或sha1sums.txt文件的校验和相匹配。</p>
      <a href="https://mirrors.firerain.xyz/iso">mirrors</a>
      <p>暂只允许内测人员下载</p>
      <mdc-button unelevated @click="$refs.dialog.show()">内测资格申请</mdc-button>
    </mdc-card-text>
  </mdc-card>
  <mdc-dialog ref="dialog" title="内测资格申请" accept="提交" cancel="取消" @accept="onAccept" scrollable>
    <mdc-headline>义务</mdc-headline>
    <p>1.积极参与内测活动</p>
    <p>2.及时反馈最新的内测结果</p>
    <p>3.积极与火雨操作系统官方开发者沟通问题</p>
    <p>4.对火雨操作系统提出有意义的建议</p>
    <p>5.不可私自散播内测活动的内容和数据</p>
    <mdc-headline>权利</mdc-headline>
    <p>1.在第一时间体验火雨操作系统的最新开发成果</p>
    <p>2.提前获取最新的开发计划和动态</p>
    <p>3.拥有特殊组别和更高的论坛权限</p>
    <mdc-textfield v-model="region" size="100%" label="地区" name="region" type="text"/>
    <mdc-textfield v-model="email" size="100%" label="邮箱" helptext="请使用常用邮箱，用于接收内部测试团队资格申请的处理结果(可能不会短时间内处理)"
                   name="email" type="email"/>
    <mdc-textfield v-model="qq" size="100%" label="QQ" helptext="用于及时沟通和加入FIreRain内测团队QQ群" name="qq" type="text" pattern="[1-9][0-9]{4,}"/>
    <!--<mdc-headline>主要在线时间</mdc-headline>-->
    <!--<mdc-checkbox name="time" label="00:00 -&#45;&#45; 9:00"/>-->
    <!--<mdc-checkbox name="time" label="9:00 -&#45;&#45; 12:00"/>-->
    <!--<mdc-checkbox name="time" label="12:00 -&#45;&#45; 18:00"/>-->
    <!--<mdc-checkbox name="time" label="18:00 -&#45;&#45; 00:00"/>-->
    <!--<br>-->
    <mdc-textfield v-model="introduction" label="自我介绍" helptext="请填写 个人介绍+个人能力（电脑方面）" multiline rows="8" name="introduction"
                   type="text"/>
    <mdc-textfield v-model="suggest" label="建议" helptext="请发表您对内部测试团队的建议" multiline rows="8" name="suggest"
                   type="text"/>
    <mdc-headline>交流方式</mdc-headline>
    <!--<p>1.官方论坛:bbs.firerain.xyz</p>-->
    <p>1.FireRainOS内测团队QQ群</p>
  </mdc-dialog>
  </div>
</template>

<script>
    export default {
      name: "download",
      data(){
        return{
          region:'',
          email:'',
          qq:'',
          introduction:'',
          suggest:''
        }
      },
      methods: {
        onAccept(){
          this.$http.post("/api/list/add",{
            region:this.region,
            email:this.email,
            qq:this.qq,
            introduction:this.introduction,
            suggest:this.suggest
          }).then(r=>{
              alert('提交成功')
          }).catch(error=>{
            alert("提交失败")
          })
        }
      }
    }
</script>

<style scoped>
  .mdc-typography{
    margin: 150px;
    text-align: left;
  }
</style>
