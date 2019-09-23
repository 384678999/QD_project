<template>
    <div id="app-body">
        <Index-top :title="'分类'"></Index-top>
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
                            prop="title"
                            label="名称">
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
                formData: {},
                loading:true,
                tableData: [],
                ids:'',
            }
        },
        components:{
            IndexTop,
            refresh
        },
        created(){
            //日志
            //this.$api.fun.logsStore({users_id:this.$cookies.get('user_id'),title:'查看：分类列表'});
            this.article_cateList();
        },
        methods:{
            article_cateList(params){
                this.loading = true ;
                this.$api.fun.article_cateList(params).then((res)=>{
                    this.loading = false ;
                    //console.log(res.meta);
                    this.tableData= res.data;
                });
            },
            handleAdd(){
                this.$router.push({path:'/article_cate/form'})
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
                        this.$api.fun.article_cateDelete({id:this.ids}).then((res)=>{
                            if(res.status){
                                this.$notify.success({title:'成功',message:res.msg});
                                this.article_cateList();
                            }else{
                                this.$notify.error({title:'错误',message:res.msg});
                            }
                        });
                    }).catch(()=>{

                    });
                }
            },
            handleEdit(index, row) {
                this.$router.push({path:'/article_cate/form/'+row.id,});
            },
            handleDelete(index, row) {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.fun.article_cateDelete({id:row.id}).then((res)=>{
                        if(res.status){
                            this.$notify.success({title:'成功',message:res.msg});
                            this.article_cateList();
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