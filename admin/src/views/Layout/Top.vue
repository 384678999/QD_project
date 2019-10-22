<template>
  <div class="header">
    <div class="header-logo">
      <router-link to="/">中国脑科网</router-link>
    </div>
    <div class="header-right">
      <span class="name">{{$cookies.get('username')}}</span>
      <div class="header-attr">
        <img :src="$cookies.get('avatar')" alt />
      </div>
      <span class="logout" @click="logout">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      var params = new URLSearchParams();

      params = {
        username: this.$cookies.get("username")
      };
      this.$api.fun.exit(params).then(res => {
        this.$cookies.remove("username");
        this.$cookies.remove("user_uid");
        this.$cookies.remove("jwt");
        this.$cookies.remove("avatar");
        //   this.$cookies.remove("perms");
        this.$router.push({
          path: "/login"
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.header {
  position: relative;
  height: 50px;
  background: #044599;
  .header-logo {
    line-height: 50px;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin-left: 54px;
    a {
      color: white;
    }
  }
  .header-logo:before {
    content: "";
    display: inline-block;
    width: 34px;
    height: 34px;
    margin-right: 15px;
    background: url("../../assets/img/fun/icon-top.png") no-repeat center;
  }
  .header-right {
    height: 100%;
    position: absolute;
    right: 90px;
    top: 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    .name {
      color: white;
    }
    .header-attr {
      display: inline-block;
      width: 37px;
      height: 37px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 15px;
      img {
        width: 100%;
      }
    }
    .logout {
      margin-left: 15px;
      color: white;
      cursor: pointer;
    }
  }
}
</style>