import axios from 'axios';

const BaseUrl = 'http://naoke-api.test/api/';

export default {
    testGet: (params) => { return axios.post(BaseUrl + 'user/auth', params) },
    usersList: (params) => { return axios.get(BaseUrl + 'user/auth', params) },
};
