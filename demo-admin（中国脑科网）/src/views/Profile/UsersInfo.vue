<template>
  <div>
    <el-card shadow="always">
      <div class="top">
        <span>个人资料</span>
        <el-button type="primary" icon="el-icon-edit" @click="edit()" size="mini">编辑</el-button>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人资料</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </el-card>
    <el-card shadow="always">
      <div class="bodys" v-loading="loading">
        <el-row :gutter="20">
          <el-col :span="3" class="title">
            <div class="grid-content bg-purple">账号：</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">{{user.name}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" class="title">
            <div class="grid-content bg-purple">email：</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">{{user.email}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="user.attr">
          <el-col :span="3" class="title">
            <div class="grid-content bg-purple">头像：</div>
          </el-col>
          <el-col :span="12">
            <img :src="$url+'uploads/'+user.attr" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" class="title">
            <div class="grid-content bg-purple">创建时间：</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">{{user.created_at}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" class="title">
            <div class="grid-content bg-purple">最后登陆时间：</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">{{user.updated_at}}</div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      loading: true
    };
  },
  created() {
    let id = this.$cookies.get("user_id");
    this.$api.fun.usersShow({ id: id }).then(res => {
      this.loading = false;
      this.user = res.data;
    });
  },
  methods: {
    edit() {
      this.$router.push({
        path: "/profile/edit"
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
}
.el-row {
  .el-col {
    margin-top: 15px;
    div {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      color: #333333;
    }
  }
  .title {
    text-align: right;
  }
}
</style>