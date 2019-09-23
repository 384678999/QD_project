<template>
    <div id="app-body">
        <Index-top :title="'文章'"></Index-top>
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
                        <el-form-item label="标题">
                            <el-input v-model="formData.title" size="small" placeholder="标题"></el-input>
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
                            prop="title"
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            prop="article_cate_id"
                            label="分类">
                        <template slot-scope="scope">
                            {{scope.row.article_cate.data.title}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="创建时间"
                            width="180">
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
                formData: {},
                loading:true,
                tableData: [],
                total: 0, // 总页数
                pageSize: 0, // 每页显示的数量
                currentPage: 0,  //当前第几页
                ids:'',
            }
        },
        components:{
            IndexTop,
            refresh
        },
        created(){
            //日志
            //this.$api.fun.logsStore({users_id:this.$cookies.get('user_id'),title:'查看：用户列表'});
            this.articleList({include:'article_cate'});
        },
        watch: {
            //分页监听
            currentPage(to, from) {
                if(from !=0){
                    //搜索分页
                    let length=Object.keys(this.formData).length;
                    if(length ==0){
                        this.articleList({page:to,include:'article_cate'});
                    }else{
                        this.formData.page = to;
                        this.formData.include = 'article_cate';
                        this.articleList(this.formData);
                    }
                }
            }
        },
        methods:{
            articleList(params){
                this.loading = true ;
                this.$api.fun.articleList(params).then((res)=>{
                    this.loading = false ;
                    //console.log(res.data);
                    this.tableData= res.data;
                    this.total = res.meta.pagination.total;
                    this.currentPage = res.meta.pagination.current_page;
                    this.pageSize = res.meta.pagination.per_page;
                });
            },
            handleAdd(){
                this.$router.push({path:'/article/form'})
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
                        this.$api.fun.articleDelete({id:this.ids}).then((res)=>{
                            if(res.status){
                                this.$notify.success({title:'成功',message:res.msg});
                                this.articleList({include:'article_cate'});
                            }else{
                                this.$notify.error({title:'错误',message:res.msg});
                            }
                        });
                    }).catch(()=>{

                    });
                }
            },
            handleEdit(index, row) {
                this.$router.push({path:'/article/form/'+row.id,});
            },
            handleDelete(index, row) {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.fun.articleDelete({id:row.id}).then((res)=>{
                        if(res.status){
                            this.$notify.success({title:'成功',message:res.msg});
                            this.articleList({include:'article_cate'});
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
                    this.articleList(this.formData);
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