<template>
  <div>
    <Form-Top :title="'权限'" :path="'/permissions'"></Form-Top>
    <el-card shadow="always">
      <el-row class="bodys">
        <el-col :span="12">
          <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="资源" prop="uri">
              <el-input v-model="formData.uri"></el-input>
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
      flag: true,
      loading: true,
      rules: {
        uri: [{ required: true, message: "请输入资源", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      formData: {}
    };
  },
  components: {
    FormTop
  },
  created() {
    this.handle(this.$route.query);
  },
  methods: {
    handle(e) {
      if (e.type === "edit") {
        this.flag = true;
        // this.title = "编辑用户";
        // this.message = "编辑已存在账户";
        this.getuacRoleByid();
      } else {
        this.flag = false;
        // this.title = "新增权限";
        // this.message = "编辑已存在账户";
      }
    },
    getuacRoleByid() {
      let id = this.$route.query.id;
      console.log(id);
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", this.$cookies.get("user_uid"));
      params.append("id", id);
      this.$api.fun.getuacRoleByid(params).then(res => {
        this.loading = false;
        this.formData = res.data.authUsers;
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
          let id = this.$route.query.id;

          if (id) {
            var params = new URLSearchParams();
            params.append("tokenKey", this.$cookies.get("jwt"));
            params.append("usernameper", this.$cookies.get("username"));
            params.append("uidper", this.$cookies.get("user_uid"));
            params.append("name", this.formData.name);
            params.append("uri", this.formData.uri);
            params.append("id", id);
            this.$api.fun.updateUacRole(params).then(res => {
              this.routerLink();
            });
          } else {
            var params = new URLSearchParams();
            params.append("tokenKey", this.$cookies.get("jwt"));
            params.append("usernameper", this.$cookies.get("username"));
            params.append("uidper", this.$cookies.get("user_uid"));
            params.append("name", this.formData.name);
            params.append("uri", this.formData.uri);
            this.$api.fun.insertUser(params).then(res => {
              this.routerLink();
            });
          }
        } else {
          return false;
        }
      });
    }
    // onSubmit(formData) {
    //   this.$refs[formData].validate(valid => {
    //     if (valid) {
    //       var params = new URLSearchParams();
    //       params.append("name", this.formData.name);
    //       params.append("uri", this.formData.uri);

    //       this.$api.fun.insertUser(params).then(res => {
    //         if (!res.status) {
    //           if (this.$route.query.id) {
    //             var params = new URLSearchParams();
    //             params.append("id", this.$route.query.id);
    //             this.$api.fun.deleteuacRoleList(params).then(res => {
    //               console.log(res);
    //             });
    //           }
    //           this.routerLink();
    //         } else {
    //         }
    //       });
    //     } else {
    //       return false;
    //     }
    //   });
    // }
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