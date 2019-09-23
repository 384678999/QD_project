<template>
    <el-button type="danger" icon="el-icon-refresh" circle @click="refresh"></el-button>
</template>

<script>
    export default {
        methods:{
            refresh(){
                window.location.reload();
            }
        }
    }
</script>

<style scoped>

</style>