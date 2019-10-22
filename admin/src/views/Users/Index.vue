<template>
  <div id="app-body">
    <Index-top :title="'用户'"></Index-top>
    <el-card shadow="always">
      <div class="bodys">
        <div class="form">
          <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item>
              <refresh></refresh>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="handleAdd" icon="el-icon-plus">添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="warning"
                size="small"
                @click="handleDeleteAll"
                icon="el-icon-delete"
              >批量删除</el-button>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formData.realname" size="small" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="batchlock" icon="el-icon-lock">批量锁定</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="batchUnlock" icon="el-icon-unlock">批量解锁</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          v-loading="loading"
          @selection-change="handleSelectionChange"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="username" label="用户名" width="180"></el-table-column>
          <el-table-column prop="realname" label="姓名" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
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
import IndexTop from "@/components/IndexTop.vue";
import refresh from "@/components/Refresh.vue";
import Function from "@/function";
import { error, log } from "util";
export default {
  data() {
    return {
      formData: {},
      loading: true,
      tableData: [],
      total: 0, // 总页数
      pageSize: 10, // 每页显示的数量
      currentPage: 1, //当前第几页
      start: 0,
      ids: ""
    };
  },
  components: {
    IndexTop,
    refresh
  },
  mounted() {
    //console.log(Function.getIsPerms('users-delete'));
    this.uacUsersList();
    console.log(this.tableData.email);
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
        this.uacUsersList(params);
      }
    }
  },
  methods: {
    uacUsersList() {
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      params.append("uid", parseInt(this.$cookies.get("user_uid")));
      params.append("start", this.currentPage);
      params.append("limit", 10);

      this.loading = true;
      this.$api.fun.uacUsersList(params).then(res => {
        this.loading = false;
        // console.log(res);
        this.tableData = res.data.pageInfo.list;
        this.total = res.data.pageInfo.total;
        // console.log(this.total);
      });
    },

    // 跳转新增
    handleAdd() {
      this.$router.push({ path: "/users/form", query: { type: "add" } });
    },
    // 跳转编辑
    handleEdit(index, row) {
      this.$router.push({
        path: "/users/form/",
        query: { type: "edit", id: row.uid }
      });
    },
    // 批量删除
    handleDeleteAll() {
      if (this.ids.length == 0) {
        this.$message.error({ message: "请选择" });
      } else {
        this.$confirm("是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var params = new URLSearchParams();
            params.append("tokenKey", this.$cookies.get("jwt"));
            params.append("usernameper", this.$cookies.get("username"));
            params.append("uidper", parseInt(this.$cookies.get("user_uid")));
            params.append("uid", this.ids);
            // console.log(this.ids);
            this.$api.fun.deleteUserlist(params).then(res => {
              if (!res.status) {
                this.$notify.success({ title: "成功", message: res.msg });
                this.uacUsersList();
              } else {
                this.$notify.error({ title: "错误", message: res.msg });
              }
            });
          })
          .catch(() => {});
      }
    },

    //删除
    handleDelete(index, row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = new URLSearchParams();
          params.append("tokenKey", this.$cookies.get("jwt"));
          params.append("usernameper", this.$cookies.get("username"));
          params.append("uidper", parseInt(this.$cookies.get("user_uid")));
          params.append("uid", row.uid);
          this.$api.fun.deleteUser(params).then(res => {
            if (!res.status) {
              this.$notify.success({ title: "成功", message: res.msg });
              this.uacUsersList();
            } else {
              this.$notify.error({ title: "错误", message: res.msg });
            }
          });
        })
        .catch(() => {});
    },
    // 批量锁定
    batchlock() {
      if (this.ids.length == 0) {
        this.$message.error({ message: "请选择" });
      } else {
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", parseInt(this.$cookies.get("user_uid")));
        params.append("uid", this.ids);
        // console.log(this.ids);
        this.$api.fun.deleteStatusList(params).then(res => {
          if (!res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
            this.uacUsersList();
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
      }
    },
    // 批量解锁
    batchUnlock() {
      if (this.ids.length == 0) {
        this.$message.error({ message: "请选择" });
      } else {
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", parseInt(this.$cookies.get("user_uid")));
        params.append("uid", this.ids);
        // console.log(this.ids);

        this.$api.fun.updateUnlockList(params).then(res => {
          if (!res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
            this.uacUsersList();
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
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
    // 正常  锁定
    handleLock(index, row) {
      if (row.status == 1) {
        row.status = 2;
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", parseInt(this.$cookies.get("user_uid")));
        params.append("uid", row.uid);
        this.$api.fun.updateStatus(params).then(res => {
          if (!res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
        // row.status = 1;
        // this.$api.fun.usersLock({ id: row.id, type: 1 }).then(res => {
        //   if (res.status) {
        //     this.$notify.success({ title: "成功", message: res.msg });
        //   } else {
        //     this.$notify.error({ title: "错误", message: res.msg });
        //   }
        // });
      } else {
        row.status = 1;
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", parseInt(this.$cookies.get("user_uid")));
        params.append("uid", row.uid);
        this.$api.fun.updateUnlock(params).then(res => {
          if (!res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
        // row.status = 0;
        // this.$api.fun.usersLock({ id: row.id, type: 0 }).then(res => {
        //   if (res.status) {
        //     this.$notify.success({ title: "成功", message: res.msg });
        //   } else {
        //     this.$notify.error({ title: "错误", message: res.msg });
        //   }
        // });
      }
    },
    onSubmit() {
      let length = Object.keys(this.formData).length;
      if (length == 0) {
        this.$notify.warning({ title: "错误", message: "输入搜索条件" });
      } else {
        // var params = {
        //   realname: this.formData.realname,
        //   tokenKey: this.$cookies.get("jwt"),
        //   usernameper: this.$cookies.get("username"),
        //   uidper: this.$cookies.get("user_uid")
        // };
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", parseInt(this.$cookies.get("user_uid")));
        params.append("realname", this.formData.realname);
        params.append("start", this.currentPage);
        params.append("limit", 10);
        this.$api.fun.uacUsersList(params).then(res => {
          this.tableData = res.data.pageInfo.list;
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
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