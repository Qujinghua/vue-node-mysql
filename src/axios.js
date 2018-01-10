import axios from 'axios'
import router from './router/index'
import store from './store/index'
import * as types from './store/types'

//全局默认配置
//所有请求5秒之后发出
axios.default.timeout = 5000
//全局请求headers配置
axios.defaults.headers.post['Content-Type'] = 'application/json'

var instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

//添加一个请求拦截器
axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
  if(localStorage.getItem('token')) {
    config.headers.Authorization = `token ${localStorage.getItem('token')}`
    .replace(/(^\")|(\"$)/g, '')
  }
  return config
},err => {
  return Promise.reject(err)
})

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
    return instance.post('/api/userLogin', data)
  },
  //获取用户
  getUser() {
    return instance.get('/api/getUser')
  },
  //删除用户
  delUser(data) {
    return instance.post('/api/delUser', data)
  }
}
