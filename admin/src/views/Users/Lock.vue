<template>
  <div id="app-body">
    <el-card shadow="always">
      <div class="top">
        <span>锁定用户</span>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>锁定用户</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </el-card>
    <el-card shadow="always">
      <div class="bodys">
        <div class="form">
          <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input v-model="formData.realname" size="small" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="formData.sex" size="small" placeholder="性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="batchUnlock" icon="el-icon-unlock">批量解锁</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          @selection-change="handleSelectionChange"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="realname" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="logged" label="最后登陆时间" width="180"></el-table-column>
          <el-table-column prop="created" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="status" label="状态" width="90">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" content="点击锁定" placement="left-start">
                <el-button
                  v-if="scope.row.status == 1"
                  type="primary"
                  plain
                  size="small"
                  @click="handleLock(scope.$index, scope.row)"
                >正常</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="点击解锁" placement="left-start">
                <el-button
                  v-if="scope.row.status == 2"
                  type="danger"
                  plain
                  size="small"
                  @click="handleLock(scope.$index, scope.row)"
                >锁定</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
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
export default {
  data() {
    return {
      loading: true,
      formData: {},
      tableData: [],
      total: 0, // 总页数
      pageSize: 10, // 每页显示的数量
      currentPage: 1, //当前第几页
      ids: []
    };
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
        params.append("start", 0);
        params.append("limit", 10);
        this.getUserStatusList(params);
      }
    }
  },
  created() {
    this.getUserStatusList();
  },
  methods: {
    getUserStatusList() {
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      params.append("start", this.currentPage);
      params.append("limit", 10);
      this.$api.fun.getUserStatusList(params).then(res => {
        this.loading = false;
        this.tableData = res.data.pageInfo.list;
        this.total = res.data.pageInfo.total;
        // console.log(this.total);
      });
    },
    // 批量解锁
    batchUnlock() {
      if (this.ids.length == 0) {
        this.$message.error({ message: "请选择" });
      } else {
        // if (row.status == 2) {
        //   row.status = 1;

        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", this.$cookies.get("user_uid"));
        params.append("uid", this.ids);
        console.log(this.ids);

        this.$api.fun.updateUnlockList(params).then(res => {
          if (!res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
            this.getUserStatusList();
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
        // }
      }
    },
    handleSelectionChange(val) {
      let ids = "";
      for (let i = 0; i < val.length; i++) {
        if (i == val.length - 1) {
          ids += val[i].uid;
        } else {
          ids += val[i].uid + ",";
        }
      }
      this.ids = ids;
    },
    handleLock(index, row) {
      console.log(row);
      if (row.status == 2) {
        row.status = 1;
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", this.$cookies.get("user_uid"));
        params.append("uid", row.uid);
        this.$api.fun.updateUnlock(params).then(res => {
          if (!res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
            this.getUserStatusList();
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
        // this.$notify({
        //   type: "success",
        //   message: "解锁成功！"
        // });
      } else {
        row.status = 2;
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", this.$cookies.get("user_uid"));
        params.append("uid", row.uid);

        this.$api.fun.updateStatus(params).then(res => {
          if (!res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
            this.getUserStatusList();
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
            this.getUserStatusList();
          }
        });
        // this.$notify({
        //   type: "success",
        //   message: "成功锁定！"
        // });
      }
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/profile/edit/" + row.id
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      // console.log(this.formData.sex);
      // console.log(this.formData.realname);
      let length = Object.keys(this.formData).length;
      if (length == 0) {
        this.$notify.warning({ title: "错误", message: "输入搜索条件" });
      } else {
        // var params = {
        //   tokenKey: this.$cookies.get("jwt"),
        //   usernameper: this.$cookies.get("username"),
        //   uidper: this.$cookies.get("user_uid"),
        //   realname: this.formData.realname,
        //   gender: this.formData.sex
        // };
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", this.$cookies.get("user_uid"));
        if (this.formData.realname != undefined)
          params.append("realname", this.formData.realname);
        if (this.formData.gender != undefined)
          params.append("gender", this.formData.sex);
        params.append("start", this.currentPage);
        params.append("limit", 10);
        this.$api.fun.getUserStatusList(params).then(res => {
          this.tableData = res.data.pageInfo.list;
        });
      }
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