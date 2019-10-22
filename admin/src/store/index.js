import Vue from 'vue'
import Vuex from 'vuex'

import fun from './modules/fun'
import leition from './modules/leition'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        fun,
        leition
    }
});


