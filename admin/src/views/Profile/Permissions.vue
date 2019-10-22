<template>
  <div id="app-body">
    <el-card shadow="always">
      <div class="top">
        <span>我的权限</span>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>我的权限</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </el-card>
    <el-card shadow="always">
      <div class="bodys">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="uid" label="ID" width="90"></el-table-column>
          <el-table-column prop="roleName" label="名称"></el-table-column>
          <el-table-column prop="uri" label="路由"></el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            background
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      total: 0, // 总页数
      pageSize: 10, // 每页显示的数量
      currentPage: 1 //当前第几页
    };
  },
  mounted() {
    this.getUserper();
  },
  watch: {
    //分页监听
    currentPage(to, from) {
      if (from != 0) {
        //搜索分页
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", parseInt(this.$cookies.get("user_uid")));
        params.append("uid", parseInt(this.$cookies.get("user_uid")));
        params.append("start", to);
        params.append("limit", 10);
        this.getUserper(params);
      }
    }
  },
  methods: {
    getUserper() {
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      params.append("uid", parseInt(this.$cookies.get("user_uid")));
      this.$api.fun.getUserper(params).then(res => {
        this.total = res.data.pageInfo.total;
        this.tableData = res.data.pageInfo.list;
        console.log(this.tableData);
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
.pages {
  margin-top: 20px;
}
</style>