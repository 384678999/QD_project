<template>
    <div id="app-body">
        <el-card shadow="always">
            <div class="top">
                <span>我的权限</span>
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item >我的权限</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </el-card>
        <el-card shadow="always">
            <div class="bodys">
                <el-table
                        :data="tableData"
                        v-loading="loading"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            prop="display_name"
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="路由">
                    </el-table-column>
                </el-table>

            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                loading : true,
            }
        },
        created(){
            let id = this.$cookies.get('user_id');
            this.usersPermissions({id:id});
        },
        methods:{
            usersPermissions(params){
                this.$api.fun.usersPermissions(params).then((res)=>{
                    this.loading = false ;
                   this.tableData = res.data;
                });
            },
        }
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
    .bodys{
        height: calc(100% - 66px);
        border: 1px solid #e6ebf5;
        .form{
            margin-top: 22px;
            form{
                margin-left: 20px;
            }
        }
    }
    .pages{
        margin-top: 20px;
    }
</style>