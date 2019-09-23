<template>
    <div id="app-body">
        <Index-top :title="'权限'"></Index-top>
        <el-card shadow="always">
            <div class="bodys">
                <div class="form">
                    <el-form :inline="true" :model="formData" class="demo-form-inline">
                        <el-form-item>
                            <refresh></refresh>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" size="small" @click="handleAdd" icon="el-icon-plus">添加</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="warning" size="small" @click="handleDeleteAll"  icon="el-icon-delete">批量删除</el-button>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="formData.display_name" size="small" placeholder="名称"></el-input>
                        </el-form-item>
                        <el-form-item label="路由">
                            <el-input v-model="formData.name" size="small" placeholder="路由"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table
                        v-loading="loading"
                        @selection-change="handleSelectionChange"
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="35">
                    </el-table-column>
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
                            label="路由名称">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    icon="el-icon-edit"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pages">
                    <el-pagination
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            background
                            layout="prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import IndexTop from '@/components/IndexTop.vue'
    import refresh from '@/components/Refresh.vue'
    export default {
        data() {
            return {
                loading :true,
                formData: {},
                tableData: [],
                total: 0, // 总页数
                pageSize: 0, // 每页显示的数量
                currentPage: 1,  //当前第几页
                ids:'',
            }
        },
        components:{
            IndexTop,
            refresh
        },
        created(){
            this.permissionsList();
        },
        watch: {
            //分页监听
            currentPage(to, from) {
                if(to !=1 && from !=0){
                    //搜索分页
                    let length=Object.keys(this.formData).length;
                    if(length ==0){
                        console.log(to+'---'+ from);
                        this.permissionsList({page:to});
                    }else{
                        this.formData.page = to;
                        this.permissionsList(this.formData);
                    }
                }
            }
        },
        methods:{
            permissionsList(params){
                this.loading = true ;
                this.$api.fun.permissionsList(params).then((res)=>{
                    //console.log(res.meta);
                    this.tableData= res.data;
                    this.total = res.meta.pagination.total;
                    this.currentPage = res.meta.pagination.current_page;
                    this.pageSize = res.meta.pagination.per_page;
                    this.loading = false ;
                });
            },
            handleAdd(){
                this.$router.push({path:'/permissions/form'})
            },
            handleDeleteAll(){
                if(this.ids.length ==0){
                    this.$message.error({message:'请选择'})
                }else{
                    this.$confirm('是否删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$api.fun.permissionsDelete({id:this.ids}).then((res)=>{
                            if(res.status){
                                this.$notify.success({title:'成功',message:res.msg});
                                this.permissionsList();
                            }else{
                                this.$notify.error({title:'错误',message:res.msg});
                            }
                        });
                    }).catch(()=>{
                    });
                }
            },
            handleEdit(index, row) {
                this.$router.push({path:'/permissions/form/'+row.id,});
            },
            handleDelete(index, row) {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.fun.permissionsDelete({id:row.id}).then((res)=>{
                        if(res.status){
                            this.$notify.success({title:'成功',message:res.msg});
                            this.permissionsList();
                        }else{
                            this.$notify.error({title:'错误',message:res.msg});
                        }
                    });
                }).catch(()=>{

                });
            },
            handleSelectionChange(val) {
                let ids='';
                for (let i=0;i<val.length;i++){
                    if(i == val.length -1){
                        ids +=val[i].id;
                    }else {
                        ids +=val[i].id+',';
                    }
                }
                this.ids=ids;
            },
            onSubmit() {
                let length=Object.keys(this.formData).length;
                if(length ==0){
                    this.$notify.warning({title:'错误',message:'输入搜索条件'})
                }else{
                    this.permissionsList(this.formData);
                }
            }
        }
    }
</script>

<style scoped lang="less">
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