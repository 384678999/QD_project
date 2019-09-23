<template>
  <div>
    <Form-Top :title="'分类'" :path="'/article_cate'"></Form-Top>
    <el-card shadow="always">
      <el-row class="bodys">
        <el-col :span="12">
          <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="分类" prop="title">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <!--<Upload-File :fileList="fileList" @upload-file="uploadFile"></Upload-File>-->

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
import FormTop from "@/components/FormTop";
import UploadFile from "@/components/UploadFile";
export default {
  data() {
    return {
      formData: {},
      fileList: [],
      file: "",
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  components: {
    FormTop,
    UploadFile
  },
  watch: {
    $route(to, from) {
      if (to.params.id) {
        this.article_cateShow({ id: to.params.id });
      } else {
        this.formData = {};
      }
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      this.article_cateShow({ id: id });
    }
  },
  methods: {
    //详情
    article_cateShow(params) {
      this.$api.fun.article_cateShow(params).then(res => {
        this.formData = res.data;
        this.fileList.push({
          name: this.formData.title,
          url: this.formData.title
        });
      });
    },
    routerLink() {
      setTimeout(() => {
        this.$router.push({
          path: "/article_cate"
        });
      }, 500);
    },
    uploadFile(file) {
      this.file = file;
    },
    storeFormData(formData) {
      this.$api.fun.article_cateStore(formData).then(res => {
        if (res.status == 1) {
          this.$notify.success({ title: "成功", message: res.msg });
          this.routerLink();
        } else {
          this.$notify.error({ title: "失败", message: res.msg });
        }
      });
    },
    onSubmit(formData) {
      this.$refs[formData].validate(valid => {
        //是否有文件上传
        /*if(this.file.size !=0 &&this.file.size!=undefined){
                        let form = new FormData();
                        form.append("file",this.file);
                        this.$api.fun.uploadImg(form).then((res)=>{
                            console.log(res);
                            if(res.status==1){
                                this.formData.title = res.msg;
                                this.storeFormData(this.formData);
                            }else{
                                this.$notify.error({title:'失败',message:res.msg})
                            }
                        });
                    }*/

        if (valid) {
          this.$api.fun.article_cateStore(this.formData).then(res => {
            if (res.status == 1) {
              this.$notify.success({ title: "成功", message: res.msg });
              this.routerLink();
            } else {
              this.$notify.error({ title: "失败", message: res.msg });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.bodys {
  height: calc(100% - 66px);
  border: 1px solid #e6ebf5;
  form {
    margin-top: 10px;
  }
}
</style>