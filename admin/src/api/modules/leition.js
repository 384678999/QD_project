import axios from 'axios';

// const BaseUrl = 'http://naoke-api.test/api/';
const BaseUrl = 'http://naoke-api.test/';

export default {
    testGet: (params) => { return axios.post(BaseUrl + 'user/auth', params) },
    usersList: (params) => { return axios.get(BaseUrl + 'user/auth', params) },
    // testGets: (params) => { return axios.post(BaseUrls + 'user/auth', params) },
    // usersLists: (params) => { return axios.get(BaseUrls + 'user/auth', params) },
};
