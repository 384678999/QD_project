import Vue from 'vue'
import Router from 'vue-router'
import fun from './modules/fun'
import leition from './modules/leition'
import cookies from 'js-cookie';
import { Message, Notification } from 'element-ui'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        ...leition,
        ...fun
    ]
});
//路由拦截器
router.beforeEach((to, from, next) => {
    if (to.name != 'login') {
        if (cookies.get('user_id') == undefined) {
            //console.log(111);
            Message.error({
                message: '请登陆',
                showClose: true,
            });
            next({
                path: '/login'
            })
        } else {
            //权限判断
            let perms = cookies.get('perms');
            if (perms != null && perms.indexOf('all') == -1) {
                if (perms.indexOf(to.name) == -1) {
                    Notification.error({ title: '错误', message: '没有权限' });
                    return false;
                }
            }
            next();
        }
    } else {
        next();
    }
});

export default router
