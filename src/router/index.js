import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '../store/index.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello',
      name: 'Hello',
      component(resolve) {
        require.ensure(['@/components/Hello.vue'], () => {
          resolve(require('@/components/Hello.vue'));
        })
      },
      //设置meta字段，表示该字段需要验证
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component(resolve) {
        require.ensure(['@/components/login/login.vue'], () => {
          resolve(require('@/components/login/login.vue'))
        })
      }
    },
    {
      path: '/register',
      name: 'register',
      component(resolve) {
        require.ensure(['@/components/login/register.vue'], () => {
          resolve(require('@/components/login/register.vue'))
        })
      }
    }

  ]
})
