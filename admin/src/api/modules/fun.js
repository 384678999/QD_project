import { get, post } from './init'

export default {
    login: (params) => post('/account/login', params),  //参数 账号username 密码 password /account/login传账号username密码password当前时间自己打请求的路径/login
    exit: (params) => post('/user/exit', params),
    //图片上传
    uploadImg: (params) => post('usercentre/uploadImg', params),  //参数 uid upfile
    // 个人资料
    getPersonal: (params) => post('uacuser/getPersonal', params),  //参数 uid
    // 修改个人资料
    updateuser: (params) => post('uacuser/updateUser', params),  //参数 uid username email
    // 修改密码
    changepassword: (params) => post('uacuser/changepassword ', params),  //参数 oldpassword newpassword uid

    getUserper: (params) => post('/uacuser/getUserper', params),  //参数 传用户uid 分页start，limit

    // 用户列表
    uacUsersList: (params) => post('user/getUserList', params),  //参数 start:1 limit:2
    // 用户列表新增
    insertuser: (params) => post('uacuser/insertUser', params),  //参数 username email password
    //获取对应用户角色
    role: (params) => post('user/role', params),  //参数  appId:3
    // 修改用户信息
    updateUser: (params) => post('user/updateUser', params),  //参数 name ，uri和id
    // 删除用户
    deleteUser: (params) => post('uacuser/deleteUser', params),  //参数 uid
    // 解锁
    updateUnlock: (params) => post('uacuser/updateUnlock ', params),  //参数 uid
    // 锁定
    updateStatus: (params) => post('uacuser/updateStatus', params),  //参数 uid
    // 批量删除用户
    deleteUserlist: (params) => post('uacuser/deleteUserlist', params),  //参数 uid[ ]
    // 批量解锁
    updateUnlockList: (params) => post('uacuser/updateUnlockList', params),  //参数 uid[ ]
    // 批量锁定
    deleteStatusList: (params) => post('uacuser/deleteStatusList', params),  //参数 uid[ ]
    // 获取用户锁定列表
    getUserStatusList: (params) => post('uacuser/getUserStatusList', params),  //参数 uid[ ]


    // 获取权限列表
    getuacRoleList: (params) => post('userRolePermission/getuacRoleList', params),  //参数 模糊查询name，uri分页start，limit
    // 按id获取权限信息
    getuacRoleByid: (params) => post('userRolePermission/getuacRoleByid', params),  //参数 id
    // 修改权限
    updateUacRole: (params) => post('userRolePermission/updateUacRole', params),  //参数 name ，uri和id
    // 新增权限
    insertUser: (params) => post('userRolePermission/insertUser', params),  //参数 name，uri
    // 根据id删除
    deleteuacRoleList: (params) => post('userRolePermission/deleteuacRoleList', params),  //参数 id
    // 根据id批量删除
    deleteuacRolelist: (params) => post('userRolePermission/deleteuacRolelist', params),  //参数 id


    // 获取角色权限列表
    rolelist: (params) => post('userRole/rolelist', params),
    roleAll: (params) => post('userRole/roleAll', params),
    //获取当前角色信息
    Uacrole: (params) => post('userRole/Uacrole', params),  //参数 id
    // 修改角色权限
    updateuacRole: (params) => post('userRole/updateuacRole', params),  //参数roleid加权限的值name
    // 删除权限与角色表
    deleteuacRole: (params) => post('userRole/deleteuacRole', params),  //参数 id
    // 批量删除权限与角色表
    deleteuacRoleAll: (params) => post('userRole/deleteuacRoleAll', params),  //参数 id
    //添加角色与授权表
    uacRoleInsert: (params) => post('userRole/uacRoleInsert', params),  //参数name角色名与namepri权限
    // 所有权限
    rolePermissionlist: (params) => post('userRole/rolePermissionlist', params),


    // Login: (params) => post('login', params),
    //图片上传
    uploadImg: (params) => post('upload', params),
    //用户管理
    usersList: (params) => get('users', params),
    usersStore: (params) => post('users_store', params),
    usersShow: (params) => get('users_info', params),
    usersDelete: (params) => get('users_delete', params),
    usersLock: (params) => get('users_lock', params),
    usersPwd: (params) => post('users_pwd', params),
    usersPermissions: (params) => get('users_permissions', params),
    //角色管理
    rolesList: (params) => get('roles', params),
    rolesAll: () => get('roles'),
    rolesShow: (params) => get('roles_info', params),
    rolesStore: (params) => post('roles_store', params),
    rolesDelete: (params) => get('roles_delete', params),
    //权限管理
    permissionsList: (params) => get('permissions', params),
    getPermissionsAll: (params) => get('permissions_all', params),
    permissionsShow: (params) => get('permissions_info', params),
    permissionsStore: (params) => post('permissions_store', params),
    permissionsDelete: (params) => get('permissions_delete', params),
    //日志
    logsList: (params) => get('logs', params),
    logsStore: (params) => post('logs_store', params),
    logsUsersList: (params) => get('logs_users', params),
    //文章
    articleList: (params) => get('article', params),
    articleShow: (params) => get('article_info', params),
    articleStore: (params) => post('article_store', params),
    articleDelete: (params) => get('article_delete', params),
    //文章分类
    article_cateList: (params) => get('article_cate', params),
    article_cateShow: (params) => get('article_cate_info', params),
    article_cateStore: (params) => post('article_cate_store', params),
    article_cateDelete: (params) => get('article_cate_delete', params),
};
/*
tokenKey: this.$cookies.get("jwt"),
usernameper: this.$cookies.get("username"),
uidper: this.$cookies.get("user_uid"),
*/
/*
params.append("tokenKey", this.$cookies.get("jwt"));
params.append("usernameper", this.$cookies.get("username"));
params.append("uidper", this.$cookies.get("user_uid"));
*/