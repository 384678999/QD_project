// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'// 导入路由文件
import store from './store' // 导入vuex文件
// import api from './api' // 导入api接口

Vue.config.productionTip = false
// Vue.prototype.$api = api


// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 更改页面 title
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'my-menu'
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
