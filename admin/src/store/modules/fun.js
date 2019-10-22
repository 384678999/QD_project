import api from '../../api'

const state = {
    test:1,
    usersList:{},
};

const actions = {

};

const getters = {

};

const mutations = {
    setData(state){
        state.test = state.test  + 1;
    },
    getUsersList(state){
        api.fun.usersList().then((res)=>{
            state.usersList = res.data ;
        })
    }

};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}