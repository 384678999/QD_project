import cookies from "js-cookie";

const getIsPerms=function (val) {
    if(cookies.get('perms').indexOf('all')==-1 && cookies.get('perms').indexOf(val) == -1){
        return false;
    }else{
        return true;
    }
};

export default {
    getIsPerms
}