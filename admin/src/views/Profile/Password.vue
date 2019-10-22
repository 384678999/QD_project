<template>
  <div>
    <el-card shadow="always">
      <div class="top">
        <span>修改密码</span>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>修改密码</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </el-card>
    <el-card shadow="always">
      <el-row class="bodys">
        <el-col :span="6">
          <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="旧密码" prop="oldpassword">
              <el-input v-model="formData.oldpassword" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
              <el-input v-model="formData.newpassword" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" prop="for_pwd">
              <el-input v-model="formData.for_pwd" :show-password="true"></el-input>
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
import axios from "axios";
export default {
  data() {
    return {
      formData: {
        oldpassword: "",
        newpassword: "",
        for_pwd: ""
      },
      rules: {
        old_pwd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        for_pwd: [
          { required: true, message: "请再一次输入新密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          if (this.formData.oldpassword == this.formData.newpassword) {
            this.$notify.error({ title: "错误", message: "输入不一样的密码" });
            return false;
          }
          if (this.formData.newpassword != this.formData.for_pwd) {
            this.$notify.error({ title: "错误", message: "两次新密码不一致" });
            return false;
          }

          let uid = this.$cookies.get("user_id");
          var params = new URLSearchParams();

          params.append("tokenKey", this.$cookies.get("jwt"));
          params.append("usernameper", this.$cookies.get("username"));
          params.append("uidper", this.$cookies.get("user_uid"));

          params.append("oldpassword", this.formData.oldpassword);
          params.append("newpassword", this.formData.newpassword);
          params.append("uid", 2);
          this.$api.fun.changepassword(params).then(res => {
            console.log(res);
            // if (res.status) {
            //   this.$notify.success({ title: "成功", message: "操作成功" });

            // this.$cookies.remove("token");
            // this.$cookies.remove("name");
            // this.$cookies.remove("user_id");
            setTimeout(() => {
              this.$router.push({ path: "/login" });
            }, 500);
            // } else {
            //   this.$notify.error({ title: "失败", message: "操作失败" });
            // }
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
.top {
  position: relative;
  > span {
    display: inline-block;
    width: 88px;
    text-align: right;
    color: #244d71;
    font-size: 18px;
    font-weight: bold;
  }
  .breadcrumb {
    position: absolute;
    right: 45px;
    top: 6px;
    /deep/ .el-breadcrumb__inner {
      font-weight: normal;
      color: #244d71;
    }
  }
}
.bodys {
  height: calc(100% - 66px);
  border: 1px solid #e6ebf5;
  form {
    margin-top: 10px;
  }
}
</style>