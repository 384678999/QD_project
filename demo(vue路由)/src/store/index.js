import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//创建Vuex实例
const store=new Vuex.Store({
		//数据保存在这里，页面通过 this.$store.state来获取 可取出
 		state:{
			count:1
		},
		//Getter相当于vue中的computed计算属性
		getters:{
			getStateCount:function(state){
				return state.count+1;
			}
		}
})
export default store  //导出store
