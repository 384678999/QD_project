import {get,post} from './init'

export default{
    Login : (params) => post('login',params),
    //图片上传
    uploadImg : (params) => post('upload',params),
    //用户管理
    usersList : (params) => get('users',params),
   
    usersStore : (params) => post('users_store',params),
    usersShow : (params) => get('users_info',params),
    usersDelete : (params) => get('users_delete',params),
    usersLock : (params) => get('users_lock',params),
    usersPwd : (params) => post('users_pwd',params),
    usersPermissions : (params) => get('users_permissions',params),
    //角色管理
    rolesList : (params) => get('roles',params),
    rolesAll : () => get('roles'),
    rolesShow : (params) => get('roles_info',params),
    rolesStore : (params) => post('roles_store',params),
    rolesDelete : (params) => get('roles_delete',params),
    //权限管理
    permissionsList : (params) => get('permissions',params),
    getPermissionsAll : (params) => get('permissions_all',params),
    permissionsShow : (params) => get('permissions_info',params),
    permissionsStore : (params) => post('permissions_store',params),
    permissionsDelete : (params) => get('permissions_delete',params),
    //日志
    logsList : (params) => get('logs',params),
    logsStore : (params) => post('logs_store',params),
    logsUsersList : (params) => get('logs_users',params),
    //文章
    articleList : (params) => get('article',params),
    articleShow : (params) => get('article_info',params),
    articleStore : (params) => post('article_store',params),
    articleDelete : (params) => get('article_delete',params),
    //文章分类
    article_cateList : (params) => get('article_cate',params),
    article_cateShow : (params) => get('article_cate_info',params),
    article_cateStore : (params) => post('article_cate_store',params),
    article_cateDelete : (params) => get('article_cate_delete',params),
};
