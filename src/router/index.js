import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
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
      path: '/',
      name: 'login',
      component(resolve) {
        require.ensure(['@/components/login/login.vue'], () => {
          resolve(require('@/components/login/login.vue'))
        })
      }
    },
    {
      path: '/404',
      name: '404',
      component(resolve) {
        require.ensure(['@/components/404/404.vue'], () => {
          resolve(require('@/components/404/404.vue'))
        })
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
      path: '/home-page',
      name: 'home',
      component(resolve) {
        require.ensure(['@/components/homepage/index.vue'], () => {
          resolve(require('@/components/homepage/index.vue'))
        })
      },
      children: [
        {
          path: 'customer',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/customer/index.vue'], () => {
              resolve(require('@/components/homepage/homebody/customer/index.vue'))
            })
          },
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'usermanage',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/systemmanage/usermanage/index.vue'], () => {
              resolve(require('@/components/homepage/homebody/systemmanage/usermanage/index.vue'))
            })
          },
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'departmentmanage',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/systemmanage/departmentmanage/index.vue'], () => {
              resolve(require('@/components/homepage/homebody/systemmanage/departmentmanage/index.vue'))
            })
          },
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'exhibition',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/exhibition/index.vue'], () => {
              resolve(require('@/components/homepage/homebody/exhibition/index.vue'))
            })
          },
          meta: {
            requireAuth: true
          }
        },
      ],
      meta: {
        requireAuth: true
      }
    }

  ]
})

// 验证 session，存在才跳转
router.beforeEach((to, from, next) => {

  if(to.matched.length === 0) {
    next({
      path: '/404',
    })
  }else {

    let username = sessionStorage.getItem('username')
    if(to.meta.requireAuth) {
      if(username) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }

  }
})
// router.afterEach((to, from) => {
//   let hash = location.hash
//   let hasdArr = hash.split('/').reverse()
//   let hashChange = ''
//   switch(hasdArr[0]) {
//     case 'usermanage': hashChange = '5-1'; break;
//     case 'departmentmanage': hashChange = '5-2'; break;
//     default: hashChange = ''; break;
//   }

//   if(hashChange!=''){
//     let menuObj = {
//       classA: ['工作计划管理','客户管理','销售订单管理','财务管理/报表','系统管理'],
//       classB: [
//         ['新添工作计划','未完成工作计划','需要我协同计划','已完成工作计划'],
//         ['新增客户信息','我的客户列表'],
//         ['进行中的报价','已签销售订单','已归档销售订单'],
//         ['业绩报表','客户来源分析'],
//         ['员工管理','部门管理']
//       ]
//     }
//     let menuArr = hashChange.split('-')
//     menuArr.forEach(function(data,index,arr){
//       menuArr.push(+data);
//     });
//     sessionStorage.setItem('breadCrumbOne', menuObj.classA[menuArr[0]-1])
//     sessionStorage.setItem('breadCrumbTwo', menuObj.classB[menuArr[0]-1][menuArr[1]-1])
//   }

// })

export default router
