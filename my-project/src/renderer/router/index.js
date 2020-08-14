import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/drg',
      name: 'drg',
      component: require('@/components/DRG').default
    },
    {
      path: '/ba',
      name: 'record',
      component: require('@/components/Record').default
    },
    {
      path: '/lt',
      name: 'forum',
      component: require('@/components/Forum').default
    },
    {
      path: '/yh',
      name: 'user',
      component: require('@/components/User').default
    },
    {
      path: '/zd',
      name: 'dictionary',
      component: require('@/components/Dictionary').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
