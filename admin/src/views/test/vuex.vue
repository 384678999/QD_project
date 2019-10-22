<template>
    <div>
        <h2>使用场景：登录状态、加入购物车、父子组件、兄弟组件、跨级组件等通信</h2>
        <h2 class="test">首页{{test}} <span class="test1">1111</span></h2>
        <h2>首页{{this.$store.state.fun.test}}</h2>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
    export default {
        created(){

            //this.$store.commit('fun/setData')
            //console.log(mapMutations('fun',['setData']));
            this.setData();
            this.getUsersList();
            // if(this.usersList.length == undefined){
            //     console.log('初始化');
            //     this.getUsersList();
            // }
            //console.log(this.usersList);
        },

        computed:{
            ...mapState({
                test:(state) => state.fun.test
            }),
            ...mapState({
                usersList:state =>state.fun.usersList
            })
        },
        methods: {
            ...mapMutations('fun', [
                'setData'  // fun模块，将 `this.increment()` 映射为 `this.$store.commit('increment')`
            ]),
            ...mapMutations('fun',['getUsersList'])
        }
    }
</script>

<style scoped lang="less">
    @import "vuex.less";
</style>