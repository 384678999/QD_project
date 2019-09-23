<template>
    <div class="main">
        <IndexHeader></IndexHeader>
        <div class="app">
            <div class="aside">
                <NavBar></NavBar>
            </div>
            <div class="app-body">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import IndexHeader from '@/views/layout/Top.vue';
    import NavBar from '@/views/layout/NavBar.vue';
    export default {
        components:{
            IndexHeader,
            NavBar
        },
    }
</script>

<style scoped lang="less">
    .app{
        display: flex;
    }
    .aside{
        width: 230px;
        background: #4765a9;
    }
    @media screen and (min-width: 1200px) {
        .aside{
            display: inline-block;
        }
        .app-body{
            width: calc(100% - 230px);
        }
    }
    @media screen and (max-width: 1200px) {
        .aside{
            display: none;
        }
        .app-body{
            width: 100%;
        }
    }
    .app-body{
        padding: 10px;
        background-color: #ECF0F5;
        div{
            height: calc(100%);
            background-color: white;
        }
    }

</style>