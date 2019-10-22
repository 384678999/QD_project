import Vue from 'vue'
import Router from 'vue-router'

// 成功页面
import success from './vueRouter/success.js'
// 错误页面
import error from './vueRouter/error.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...success,
    // 404,500 错误页面
    ...error
  ]
})
