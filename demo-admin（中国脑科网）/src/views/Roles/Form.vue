<template>
    <div>
        <Form-Top  :title="'角色'" :path="'/roles'"></Form-Top>
        <el-card shadow="always">
            <el-row class="bodys" v-loading="loading">
                <el-col :span="24">
                    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
                        <el-form-item label="角色名称" prop="name">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="选择权限">
                            <el-transfer
                                    v-model="value"
                                    :data="permissionsAll"
                                    :titles="['权限列表','已选择']"
                                    :button-texts="['删除', '选择']">
                            </el-transfer>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('formData')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import FormTop from '@/components/FormTop'
    export default {
        data() {
            return {
                loading:true,
                formData: {},
                permissionsAll: [],
                value: [],
                rules:{
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                    ]
                },
            }
        },
        components:{
            FormTop
        },
        created(){
            let id=this.$route.params.id;
            if(id){
                this.rolesShow({id:id,include:'permissions'});
            }else{
                this.getPermissionsAll();
            }
        },
        watch: {
            $route(to,from){
                if(to.params.id){
                    this.rolesShow({id:to.params.id,include:'permissions'});
                }else{
                    this.formData ={};
                }
            }
        },
        methods: {
            rolesShow(params){
                this.$api.fun.rolesShow(params).then((res)=>{
                    this.formData = res.data;
                    if(this.formData.permissions.data.length!=0)
                        for (let i=0;i<this.formData.permissions.data.length;i++){
                            this.value[i] = this.formData.permissions.data[i].id;
                        }
                        //权限
                        this.getPermissionsAll();
                });

            },
            //所有权限列表
            getPermissionsAll() {
                this.$api.fun.getPermissionsAll().then((res)=>{
                    this.loading = false;
                    for (let i=0;i<res.data.length;i++){
                        this.permissionsAll.push({
                            key: res.data[i].id,
                            label: res.data[i].display_name,
                        })
                    }
                })
            },
            routerLink(){
                setTimeout(()=>{
                    this.$router.push({
                        path:'/roles'
                    })
                },500);
            },
            onSubmit(formData) {
                this.$refs[formData].validate((valid) => {
                    if(valid){
                        if(this.value != []) this.formData.permissions = this.value.join(',');

                        this.$api.fun.rolesStore(this.formData).then((res)=>{
                            if(res.status){
                                this.$notify.success({title:'成功',message:res.msg});
                                this.routerLink();
                            }else{
                                this.$notify.error({title:'错误',message:res.msg});
                            }
                        })
                    }else{
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .bodys{
        height: calc(100% - 66px);
        border: 1px solid #e6ebf5;
        form{
            margin-top: 10px;
        }
    }
    /deep/ .el-transfer-panel__body{
        height: 500px;
    }
    /deep/ .el-transfer-panel__list{
        height: 500px;
    }
    /deep/ .el-transfer-panel__item.el-checkbox{
        width: 74%;
    }
</style>