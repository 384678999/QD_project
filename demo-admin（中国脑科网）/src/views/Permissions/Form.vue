<template>
  <div>
    <Form-Top :title="'权限'" :path="'/permissions'"></Form-Top>
    <el-card shadow="always">
      <el-row class="bodys" v-loading="loading">
        <el-col :span="12">
          <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formData.display_name"></el-input>
            </el-form-item>
            <el-form-item label="资源" prop="name">
              <el-input v-model="formData.name"></el-input>
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
import FormTop from "@/components/FormTop";
export default {
  data() {
    return {
      loading: true,
      rules: {
        name: [{ required: true, message: "请输入资源", trigger: "blur" }],
        display_name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ]
      },
      formData: {}
    };
  },
  components: {
    FormTop
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      this.permissionsShow({ id: id });
    } else {
      this.loading = false;
    }
  },
  methods: {
    permissionsShow(params) {
      this.$api.fun.permissionsShow(params).then(res => {
        this.loading = false;
        this.formData = res.data;
      });
    },
    routerLink() {
      setTimeout(() => {
        this.$router.push({
          path: "/permissions"
        });
      }, 500);
    },
    onSubmit(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          this.$api.fun.permissionsStore(this.formData).then(res => {
            if (res.status) {
              this.$notify.success({ title: "成功", message: res.msg });
              this.routerLink();
            } else {
              this.$notify.error({ title: "错误", message: res.msg });
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
/*图片上传*/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.bodys {
  height: calc(100% - 66px);
  border: 1px solid #e6ebf5;
  form {
    margin-top: 10px;
  }
}
</style>