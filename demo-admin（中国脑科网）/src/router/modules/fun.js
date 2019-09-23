const fun=[
    {
        path:"/login",
        name:'login',
        component: resolve =>void(require(['@/views/Login/Login.vue'], resolve))
    },
    {
        path:"/",
        component: resolve =>void(require(['@/views/Layout/App.vue'], resolve)),
        children:[
            {
                path:"/",
                name:'index',
                component: resolve =>void(require(['@/views/Home/Index.vue'], resolve))
            },{ //个人资料
                path:"/profile",
                name:'profile',
                component: resolve =>void(require(['@/views/Profile/UsersInfo.vue'], resolve))
            },{ //个人资料-编辑
                path:"/profile/edit",
                name:'profile-edit',
                component: resolve =>void(require(['@/views/Profile/Edit.vue'], resolve))
            },{ //修改密码
                path:"/profile/password",
                name:'profile-password',
                component: resolve =>void(require(['@/views/Profile/Password.vue'], resolve))
            },{ //我的权限
                path:"/profile/permissions",
                name:'profile-permissions',
                component: resolve =>void(require(['@/views/Profile/Permissions.vue'], resolve))
            },{ //用户列表
                path:"/users",
                name:'users',
                component: resolve =>void(require(['@/views/Users/Index.vue'], resolve)),
            },{ //新增-编辑-用户
                path:"/users/form/:id?",
                name:'users-form',
                component: resolve =>void(require(['@/views/Users/Form.vue'], resolve))
            }, { //在线用户
                path:"/users/online",
                name:'users-online',
                component: resolve =>void(require(['@/views/Users/Online.vue'], resolve))
            },{ //锁定用户
                path:"/users/lock",
                name:'users-lock',
                component: resolve =>void(require(['@/views/Users/Lock.vue'], resolve))
            },{ //角色列表
                path:"/roles",
                name:'roles',
                component: resolve =>void(require(['@/views/Roles/index.vue'], resolve))
            },{ //新增-编辑-角色
                path:"/roles/form/:id?",
                name:'roles-form',
                component: resolve =>void(require(['@/views/Roles/Form.vue'], resolve))
            }, { //权限列表
                path:"/permissions",
                name:'permissions',
                component: resolve =>void(require(['@/views/Permissions/index.vue'], resolve))
            },{ //新增-编辑-权限
                path:"/permissions/form/:id?",
                name:'permissions-form',
                component: resolve =>void(require(['@/views/Permissions/Form.vue'], resolve))
            },{ //操作日志
                path:"/logs",
                name:'logs',
                component: resolve =>void(require(['@/views/Logs/OperationLogs.vue'], resolve))
            },{ //登录退出日志
                path:"/logs/users",
                name:'logs-users',
                component: resolve =>void(require(['@/views/Logs/UsersLogs.vue'], resolve))
            }, { //文章
                path:"/article",
                name:'article',
                component: resolve =>void(require(['@/views/Article/Index.vue'], resolve))
            },{ //文章-表单
                path:"/article/form/:id?",
                name:'article-form',
                component: resolve =>void(require(['@/views/Article/Form.vue'], resolve))
            },{ //文章分类
                path:"/article_cate",
                name:'article-cate',
                component: resolve =>void(require(['@/views/ArticleCate/Index.vue'], resolve))
            },{ //文章分类-表单
                path:"/article_cate/form/:id?",
                name:'article-cate-form',
                component: resolve =>void(require(['@/views/ArticleCate/Form.vue'], resolve))
            },


            { //  vuex测试
                path:"/vuex",
                name:'vuex',
                component: resolve =>void(require(['@/views/test/vuex.vue'], resolve))
            }
        ]
    },
];

export  default  fun;