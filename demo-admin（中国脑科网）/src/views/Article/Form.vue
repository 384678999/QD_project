<template>
    <div>
        <Form-Top  :title="'文章'" :path="'/article'"></Form-Top>
        <el-card shadow="always">
            <el-row class="bodys">
                <el-form ref="formData"  :model="formData" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-col :span="24">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="formData.title"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="4">
                                <el-form-item label="加粗">
                                        <el-switch v-model="formData.is_bold"></el-switch>
                                </el-form-item>
                            </el-col>  
                            <el-col :span="4">
                                <el-form-item label="颜色">
                                        <el-color-picker v-model="formData.color"></el-color-picker>
                                </el-form-item>
                            </el-col>  
                            <el-col :span="6">
                                <el-form-item label="排序" prop="order">
                                    <el-input v-model.number="formData.order"></el-input>
                                </el-form-item>
                            </el-col>  
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="副标题" prop="en_title">
                                <el-input v-model="formData.en_title"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="18">
                                <el-form-item label="所属分类" prop="article_cate_id">
                                    <el-select v-model="formData.article_cate_id" placeholder="请选择所属分类">
                                        <el-option v-for="item in article_cate_list" :key="item.id" :label="item.title" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">

                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="18">
                                <el-col :span="8">
                                    <el-form-item label="置顶">
                                        <el-switch v-model="formData.is_top"></el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="头条">
                                        <el-switch v-model="formData.is_head"></el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="推荐">
                                        <el-switch v-model="formData.is_rec"></el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="6">

                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="12">
                                <el-form-item label="作者" prop="author">
                                    <el-input v-model="formData.author"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="来源" prop="from">
                                    <el-input v-model="formData.from"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="摘要" prop="abstract">
                                <el-input type="textarea" v-model="formData.abstract" class="abstract"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="24">
                            <el-form-item label="SEO关键词" prop="seo_keywords">
                                <el-input v-model="formData.seo_keywords"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="SEO描述" prop="seo_description">
                                <el-input type="textarea" v-model="formData.seo_description" class=""></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="标签" prop="label">
                                <el-input v-model="formData.label" placeholder="多个用英文逗号(,)隔开"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" style="height:200px;">
                            <el-form-item label="缩略图">
                                <el-upload
                                        class="avatar-uploader"
                                        action="#"
                                        :auto-upload="false"
                                        :show-file-list="false"
                                        :on-change="onchange"
                                        :before-upload="beforeUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <img v-if="imageUrl=='' && formData.pic" :src="$url+'uploads/'+formData.pic" class="avatar">
                                    <i v-if="imageUrl=='' && formData.pic==undefined" class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                    <el-col :span="24">
                        <el-form-item label="内容" prop="contents">
                            <vue-ueditor  :msg="formData.contents" @on-set-contents="setContents"></vue-ueditor>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('formData')">确定</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import FormTop from '@/components/FormTop'
    import VueUeditor from '@/components/UEditor';
    export default {
        data() {
            return {
                article_cate_list:[],
                formData: {contents:''},
                contents:'',
                file:'',
                rules:{
                    title: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                    ],
                    order:[
                        { type: 'number', message: '必须为数字值'}
                    ],
                    article_cate_id: [
                        { required: true, message: '请选择分类', trigger: 'blur' },
                    ],
                    contents: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                    ],
                },
                imageUrl:''
            }
        },
        components:{
            FormTop,
            VueUeditor,
        },
        watch:{
            $route(to,from){
                if(to.params.id){
                    this.articleShow({id:to.params.id});
                }else{
                    this.formData ={};
                }
            },
        },
        created(){
            this.article_cateList();
            let id=this.$route.params.id;
            if(id){
                this.articleShow({id:id});
            }
        },
        methods: {
            //详情
            articleShow(params){
                this.$api.fun.articleShow(params).then((res)=>{
                    this.formData = res.data;
                });
            },
            article_cateList(){
                this.$api.fun.article_cateList().then((res)=>{
                    this.article_cate_list = res.data;
                })
            },
            //图片预览
            onchange(file,fileList){
                this.file=file.raw;

                var _this = this;
                var event = event || window.event;
                var files = event.target.files[0];
                var reader = new FileReader();
                //转base64
                reader.onload = function(e) {
                    _this.imageUrl = e.target.result //将图片路径赋值给src
                };
                reader.readAsDataURL(files);
            },
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return  isLt2M;
            },
            routerLink(){
                setTimeout(()=>{
                    this.$router.push({
                        path:'/article'
                    })
                },500);
            },
            setContents(data){
                this.formData.contents = data;
            },
            onSubmit(formData) {
                this.$refs[formData].validate((valid) => {
                    if(valid){
                        //是否有文件上传
                        // console.log(this.formData);return false;
                        if(this.file.size !=0 &&this.file.size!=undefined){
                            let form = new FormData();
                            form.append("file",this.file);
                            this.$api.fun.uploadImg(form).then((res)=>{
                                if(res.status==1){
                                    this.formData.pic = res.msg;
                                    this.$api.fun.articleStore(this.formData).then((res)=>{
                                        if(res.status==1){
                                            this.$notify.success({title:'成功',message:res.msg,});
                                            this.routerLink();
                                        }else{
                                            this.$notify.error({title:'失败',message:res.msg,});
                                        }
                                    });
                                }else{
                                    this.$notify.error({title:'失败',message:res.msg})
                                }
                            });
                        }else{
                            this.$api.fun.articleStore(this.formData).then((res)=>{
                                if(res.status==1){
                                    this.$notify.success({title:'成功',message:res.msg});
                                    this.routerLink();
                                }else{
                                    this.$notify.error({title:'失败',message:res.msg})
                                }
                            })
                        }
                    }else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="less">
    .abstract /deep/ .el-textarea__inner{
        height: 70px;
    }
    /*图片上传*/
     .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    /**/
    .bodys{
        height: calc(100% - 66px);
        border: 1px solid #e6ebf5;
        form{
            margin-top: 10px;
        }
    }
</style>