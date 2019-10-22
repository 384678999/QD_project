import axios from "axios/index";
import cookies from "js-cookie";

axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://192.168.1.164:99/api/';
axios.defaults.baseURL = 'http://192.168.1.146:8081/';
axios.interceptors.request.use(function (config) {
    // console.log(config)          
    let tokenKey = cookies.get('jwt');
    // if (tokenKey) {
    //     config.headers['Authorization'] = tokenKey;
    // }
    if (config.url.search('upload') != -1) {
        config.headers['Content-Type'] = "application/json" + 'multipart/form-data';
    }
    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
