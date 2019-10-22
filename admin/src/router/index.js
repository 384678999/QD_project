import Vue from 'vue'
import Router from 'vue-router'
import fun from './modules/fun'
import leition from './modules/leition'
import cookies from 'js-cookie';
import { Message, Notification, Avatar } from 'element-ui'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        ...leition,
        ...fun
    ]
});
//路由拦截器
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//         if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//             next();
//         }
//         else {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     }
//     else {
//         next();
//     }
// })
router.beforeEach((to, from, next) => {
    if (to.name != 'login') {
        if (cookies.get('user_uid') == undefined) {
            //console.log(111);
            Message.error({
                message: '请登陆',
                showClose: true,
            });
            next({
                path: '/login'
            })
        } else {
            // shouye({
            //     path: '/'
            // })
            //权限判断
            // let perms = cookies.get('perms');
            // if (perms != null && perms.indexOf('all') == -1) {
            //     if (perms.indexOf(to.username) == -1) {
            //         Notification.error({ title: '错误', message: '没有权限' });
            //         return false;
            //     }
            // }
            next();
        }
    } else {
        next();
    }
});

export default router
