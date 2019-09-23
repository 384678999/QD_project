<template>
    <el-form-item label="上传头像">
        <el-upload
                class="avatar-uploader"
                action="#"
                :auto-upload="false"
                :multiple="false"
                :show-file-list="false"
                :on-change="onchange"
                :before-upload="beforeUpload">
            <img v-if="selectImage" :src="selectImage" class="avatar">
            <img v-if="selectImage=='' && oldImg" :src="$url+'uploads/'+oldImg" class="avatar">
            <i v-if="selectImage=='' && oldImg==undefined" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
</template>

<script>
    export default {
        data(){
            return {
                selectImage:'',
                oldImg:this.pic,
            }
        },
        props:['pic',],
        watch:{
            pic:function(to,from){
                if(to){
                    //console.log(to);
                    this.oldImg = to;
                }
            },
        },
        methods:{
            //图片预览
            onchange(file,fileList){
                this.$emit('upload-img',file.raw);

                var _this = this;
                var event = event || window.event;
                var files = event.target.files[0];
                var reader = new FileReader();
                //转base64
                reader.onload = function(e) {
                    _this.selectImage = e.target.result //将图片路径赋值给src
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
        }
    }
</script>

<style scoped>
    /*图片上传*/
    /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    /deep/.avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    /deep/ .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    /**/
</style>