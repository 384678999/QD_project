import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import config from './config';
import './assets/css/reset.css';
import 'font-awesome/css/font-awesome.min.css';
import cookies from  'js-cookie';
import api from './api';
import './http'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$config = config;
Vue.prototype.$cookies = cookies;
Vue.prototype.$api = api;
Vue.prototype.$url = 'http://192.168.1.164:99/';


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
