// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios'
import store from './store/index.js'
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
new Vue({
  el: '#app',
  axios,
  store,
  router,
  template: '<App/>',
  components: { App }
})
