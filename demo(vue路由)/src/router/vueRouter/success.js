const success = [
  {
    path: '/',
    component: resolve => require(['@/public/APP'], resolve),
    children: [
      // {
      //   path: '/',
      //   redirect: 'index'
      // },
      {
        path: '/',
        name: 'home',
        meta: {
          title: 'home',
          requiresAuth: true
        },
        component: resolve => require(['@/view/home'], resolve)
      }, {
        path: 'axios',
        name: 'axios',
        meta: {
          title: 'axios',
          requiresAuth: true
        },
        component: resolve => require(['@/view/axios'], resolve)
      }, {
        path: 'qingting',
        name: 'qingting',
        meta: {
          title: 'qingting',
          requiresAuth: true
        },
        component: resolve => require(['@/view/qingting'], resolve)
      }
    ]
  }
]
export default success