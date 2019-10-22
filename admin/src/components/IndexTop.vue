<template>
    <el-card shadow="always">
        <div class="top">
            <span>{{title}}列表</span>
            <div class="breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item >{{title}}列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        props:[
            'title'
        ]
    }
</script>

<style scoped lang="less">
    .top{
        position: relative;
        >span{
            display: inline-block;
            width: 88px;
            text-align: right;
            color: #244d71;
            font-size: 18px;
            font-weight: bold;
        }
        .breadcrumb{
            position: absolute;
            right: 45px;
            top: 6px;
            /deep/ .el-breadcrumb__inner{
                font-weight: normal;
                color: #244d71;
            }
        }
    }
</style>