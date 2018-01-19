<template>
  <mdc-layout-app id="app">
    <mdc-toolbar slot="toolbar" fixed-lastrow>
      <mdc-toolbar-row>
      <mdc-toolbar-section align-start >
        <mdc-toolbar-icon>
          <img src="./assets/logo.png" width="40" height="40">
        </mdc-toolbar-icon>
        <mdc-toolbar-title>FireRainOS</mdc-toolbar-title>
      </mdc-toolbar-section>
      <mdc-toolbar-section shrink-to-fit>
        <mdc-tab-bar indicator-accent style="height: 72px">
          <mdc-tab v-for="tab in tabs" :active="tab.isActivated" @click="$router.push({path:tab.url})">{{ tab.text }}</mdc-tab>
        </mdc-tab-bar>
      </mdc-toolbar-section>
        </mdc-toolbar-row>
    </mdc-toolbar>

    <main>
      <router-view/>
    </main>

  </mdc-layout-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      "tabs": [
        {
          isActivated: this.$route.path==='/',
          url: "/",
          text: "首页"
        }, {
          isActivated: this.$route.path==='/download',
          url: "/download",
          text: "下载"
        }, {
          isActivated: this.$route.path==='/news',
          url: "/news",
          text: "新闻"
        }, {
          isActivated: this.$route.path==='/involve',
          url: "/involve",
          text: "参与"
        }, {
          isActivated: this.$route.path==='/issue',
          url: "/issue",
          text: "问题"
        }, {
          isActivated: this.$route.path==='/support',
          url: "/support",
          text: "支持"
        }
      ]
    }
  },
  watch:{
    $route(){
      for(var i=0;i<this.tabs.length;i++){
        this.tabs[i].isActivated = this.tabs[i].url===this.$route.path
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
