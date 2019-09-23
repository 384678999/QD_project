<template>
  <div id="app-body">
    <el-card shadow="always">
      <div class="top">
        <span>登录日志</span>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>登录日志</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </el-card>
    <el-card shadow="always">
      <div class="bodys">
        <el-table v-loading="loading" :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column prop="id" label="ID" width="90"></el-table-column>
          <el-table-column prop="users.data.name" label="用户"></el-table-column>
          <el-table-column prop="created_at" label="时间"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      total: 0, // 总页数
      pageSize: 0, // 每页显示的数量
      currentPage: 0 //当前第几页
    };
  },
  created() {
    //日志
    this.$api.fun.logsStore({
      users_id: this.$cookies.get("user_id"),
      title: "查看：登录日志"
    });
    this.logsUsersList({ include: "users" });
  },
  watch: {
    //分页监听
    currentPage(to, from) {
      if (to != 1 && from != 0) {
        //分页
        this.logsUsersList({ include: "users", page: to });
      }
    }
  },
  methods: {
    logsUsersList(params) {
      this.loading = true;
      this.$api.fun.logsUsersList(params).then(res => {
        //console.log(res.meta);
        this.tableData = res.data;
        this.total = res.meta.pagination.total;
        this.currentPage = res.meta.pagination.current_page;
        this.pageSize = res.meta.pagination.per_page;
        this.loading = false;
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
  .form {
    margin-top: 22px;
    form {
      margin-left: 20px;
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>