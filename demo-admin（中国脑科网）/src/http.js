import axios from "axios/index";
import cookies from "js-cookie";

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='http://192.168.1.164:99/api/';
axios.interceptors.request.use(function (config) {

    let token=cookies.get('token');
    if(token){
        config.headers['Authorization'] = "bearer "+token;
    }
    if(config.url.search('upload') != -1){
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
