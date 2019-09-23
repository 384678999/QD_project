<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <p>后台管理系统</p>
      </div>
      <el-input
        placeholder="请输入用户名"
        suffix-icon="fa fa-user"
        v-model="formData.name"
        style="margin-bottom: 18px"
      ></el-input>
      <el-input
        placeholder="请输入密码"
        suffix-icon="fa fa-keyboard-o"
        v-model="formData.password"
        type="password"
        style="margin-bottom: 18px"
        @keyup.native.enter="login"
      ></el-input>
      <el-button
        type="primary"
        :loading="loginLoading"
        style="width: 100%;margin-bottom: 18px"
        @click.native="login"
      >登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "admin",
        password: "admin"
      },
      loginLoading: false
    };
  },
  methods: {
    login() {
      this.loginLoading = true;
      if (this.formData.name == "") {
        this.$message.error({ message: "请输入用户名" });
        this.loginLoading = false;
        return false;
      }
      if (this.formData.password == "") {
        this.$message.error({ message: "请输入密码" });
        this.loginLoading = false;
        return false;
      }
      this.$api.fun.Login(this.formData).then(res => {
        this.loginLoading = false;
        if (res.status == 1) {
          this.$cookies.set("token", res.token, { expires: 0.1 });
          this.$cookies.set("name", res.user.name, { expires: 0.1 });
          this.$cookies.set("attr", res.user.attr, { expires: 0.1 });
          this.$cookies.set("user_id", res.user.id, { expires: 0.1 });
          this.$cookies.set("perms", res.user.perms, { expires: 0.1 });

          this.$message.success({ message: "登陆成功" });
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 500);
        } else {
          this.$message.error({ message: "用户名或密码不正确" });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-header p {
  font-size: 30px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #e4e5e6;
  .login-form {
    width: 375px;
    height: 260px;
    padding: 30px;
    background-color: white;
    text-align: left;
    border-radius: 4px;
    position: relative;
    margin-left: 0;
    margin-right: 0;
    zoom: 1;
    display: block;
    .login-header {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
}
</style>
