<template>
    <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :before-remove="beforeRemove"
            :multiple="false"
            :on-change="onchange"
            :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
    export default {
        props:['fileList'],
        watch:{
            fileList:function (to,form) {
                if(to){
                    console.log(to);
                    this.fileList = to;

                }
            },
        },
        methods: {
            onchange(file,fileList){
                // this.file=file.raw;
                if(this.fileList.length >0){
                    this.fileList.shift();
                    this.fileList.push({name:file.raw.name,url:file.raw.name})
                }
                this.$emit('upload-file',file.raw)

            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
        }
    }
</script>

<style scoped>

</style>