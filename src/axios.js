import axios from 'axios'
import router from './router/index'
import store from './store/index'
import * as types from './store/types'

//全局默认配置
//超时时间
axios.default.timeout = 5000
//全局请求headers配置
axios.defaults.headers.post['Content-Type'] = 'application/json'

var instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

// function getSession() {
//   return axios.get('/islogin')
// }
//添加一个请求拦截器
axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
  axios.get('/islogin')
  .then(data => {
    console.log(data)
  })
  // if(localStorage.getItem('token')) {
  //   config.headers.Authorization = `token ${localStorage.getItem('token')}`
  //   .replace(/(^\")|(\"$)/g, '')
  // }
  return config
},err => {
  return Promise.reject(err)
})

// axios.interceptors.request.use = instance.interceptors.request.use
// instance.interceptors.request.use(config => {
//   getSession().then(res => {
//     if(res.status == 401) {
//       console.log('...')
//     }
//   })
//   return config
// },err => {
//   return Promise.reject(err)
// })

//axios拦截响应
instance.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})

export default {
  //用户注册
  userRegister(data) {
    return instance.post('/api/register', data)
  },
  //用户登录
  userLogin(data) {
    return instance.post('/userLogin', data)
  },
  //获取用户
  getUser() {
    return instance.get('/getUser')
  },
  //删除用户
  delUser(data) {
    return instance.post('/api/delUser', data)
  }
}
