<template>
  <div>
    <Form-Top :title="'用户'" :path="'/users'"></Form-Top>
    <el-card shadow="always">
      <el-row class="bodys" @change="handleCheckedRolesChange">
        <el-col :span="12">
          <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
            <el-form-item v-if="this.flag" label="用户名" prop="username">
              <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item v-if="!this.flag" label="用户名" prop="username">
              <el-input readonly v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realname">
              <el-input v-model="formData.realname"></el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>

            <el-form-item v-if="this.flag" label="密码" prop="password">
              <el-input v-model="formData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item v-if="this.flag" label="确认密码" prop="conpassword">
              <el-input v-model="formData.conpassword" type="conpassword"></el-input>
            </el-form-item>
            <el-form-item v-if="!this.flag" label="重置密码" prop="password">
              <el-input v-model="formData.password" type="password"></el-input>
            </el-form-item>

            <el-form-item label="角色" prop="aaa">
              <el-checkbox-group v-model="value" @change="handleCheckedRolesChange">
                <template v-for="item in aaa">
                  <el-checkbox :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                </template>
              </el-checkbox-group>
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
import { error } from "util";
import FormTop from "@/components/FormTop";
export default {
  data() {
    return {
      flag: true,

      imageUrl: "",
      formData: {},
      file: "",
      value: [],
      aaa: [],
      rules: {
        // realname: [{ required: true, message: "请输入名称", trigger: "blur" }],
        // email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        // password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // conpassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // aaa: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  components: {
    FormTop
    // UploadImg
  },
  watch: {},
  mounted() {
    let uid = this.handle(this.$route.query);
    if (uid) {
      this.role();
    } else {
      this.rolelist();
    }
  },
  methods: {
    handle(e) {
      if (e.type === "edit") {
        this.flag = false;
        this.role();
      } else {
        this.flag = true;
      }
    },

    // 个人信息--详情
    role() {
      let uid = this.$route.query.id;
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", this.$cookies.get("user_uid"));
      params.append("uid", uid);
      this.$api.fun.role(params).then(res => {
        // console.log(res);
        this.formData = res.data.roles;
        this.RoleID = res.data.roles.RoleID;
        this.value = (this.RoleID || "").split(",").map(Number);
        console.log(this.value);
      });
    },
    rolelist() {
      this.loading = true;
      // var params = {
      //   tokenKey: this.$cookies.get("jwt"),
      //   usernameper: this.$cookies.get("username"),
      //   uidper: this.$cookies.get("user_uid"),
      //   start: 0,
      //   limit: 10
      // };
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      // params.append("uid", parseInt(this.$cookies.get("user_uid")));
      // params.append("start", 0);
      // params.append("limit", 10);
      this.$api.fun.roleAll(params).then(res => {
        console.log(res);
        for (let i = 0; i < res.data.roles.length; i++) {
          this.aaa.push({
            name: res.data.roles[i].uacRolePermission.uacPermission.name,
            id: res.data.roles[i].uacRolePermission.uacPermission.id
          });
        }
        console.log(this.aaa);
      });
    },
    routerLink() {
      setTimeout(() => {
        this.$router.push({
          path: "/users"
        });
      }, 500);
    },

    handleCheckedRolesChange(val) {
      this.formData.role_ids = val;
    },
    onSubmit(formData) {
      let uid = this.$route.query.id;
      // console.log(this.formData.role_ids);
      this.$refs[formData].validate(valid => {
        if (valid) {
          if (uid) {
            var params = new URLSearchParams();
            params.append("tokenKey", this.$cookies.get("jwt"));
            params.append("usernameper", this.$cookies.get("username"));
            params.append("uidper", this.$cookies.get("user_uid"));
            params.append("uid", uid);
            params.append("username", this.formData.username);
            params.append("email", this.formData.email);
            params.append("password", this.formData.password);
            params.append("id", this.formData.role_ids);
            this.$api.fun.updateUser(params).then(res => {
              this.routerLink();
            });
          } else {
            if (this.formData.password != this.formData.conpassword) {
              this.$notify.error({
                title: "错误",
                message: "两次新密码不一致"
              });
              this.formData.conpassword = "";
            }
            var params = new URLSearchParams();
            params.append("tokenKey", this.$cookies.get("jwt"));
            params.append("usernameper", this.$cookies.get("username"));
            params.append("uidper", this.$cookies.get("user_uid"));
            params.append("username", this.formData.username);
            params.append("email", this.formData.email);
            params.append("password", this.formData.password);
            params.append("id", this.formData.role_ids);
            this.$api.fun.insertuser(params).then(res => {
              this.routerLink();
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped >
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
</style>