import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Download from '@/components/Download'
import Involve from '@/components/Involve'
import Issue from '@/components/Issue'
import News from '@/components/News'
import Support from '@/components/Support'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/download',
      name: 'Download',
      component: Download
    },
    {
      path: '/involve',
      name: 'Involve',
      component: Involve
    },
    {
      path: '/issue',
      name: 'Issue',
      component: Issue
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/support',
      name: 'Support',
      component: Support
    },
  ]
})
